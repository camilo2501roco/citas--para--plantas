<template>
  <q-dialog v-model="showDialog" @hide="resetForm">
    <q-card style="min-width: 500px; max-width: 600px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-dark">🌱 Crear Nuevo Perfil</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          
          <div class="row q-col-gutter-md">
            <div class="col-4">
              <div class="text-center">
              
                <q-img 
                  v-if="form.imagen"
                  :src="form.imagen" 
                  style="width: 80px; height: 80px; border-radius: 50%;"
                  class="q-mb-sm"
                />
                
             
                <q-file
                  v-model="archivoImagen"
                  label="Subir imagen"
                  accept="image/*"
                  outlined
                  dense
                  @update:model-value="procesarImagen"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>
            
            <div class="col-8">
              <q-input
                v-model="form.nombre"
                label="Nombre de la planta *"
                outlined
                :rules="[val => !!val || 'Campo requerido']"
                color="dark"
                label-color="dark"
              />
              
              <q-select
                v-model="form.tipo"
                :options="TIPOS_PLANTA"  
                label="Tipo de planta *"
                outlined
                :rules="[val => !!val || 'Selecciona un tipo']"
                class="q-mt-sm"
                color="dark"
                label-color="dark"
                options-dark
                popup-content-class="text-dark"
              />
            </div>
          </div>

          <q-input
            v-model="form.edad"
            label="Edad"
            outlined
            placeholder="Ej: 2 años, 6 meses"
            color="dark"
            label-color="dark"
          />

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-select
                v-model="form.luz"
                :options="opcionesLuz"
                label="Luz *"
                outlined
                :rules="[val => !!val || 'Campo requerido']"
                color="dark"
                label-color="dark"
                options-dark
                popup-content-class="text-dark"
              />
            </div>
            <div class="col-4">
              <q-select
                v-model="form.agua"
                :options="opcionesAgua"
                label="Agua *"
                outlined
                :rules="[val => !!val || 'Campo requerido']"
                color="dark"
                label-color="dark"
                options-dark
                popup-content-class="text-dark"
              />
            </div>
            <div class="col-4">
              <q-select
                v-model="form.temperatura"
                :options="opcionesTemperatura"
                label="Temperatura *"
                outlined
                :rules="[val => !!val || 'Campo requerido']"
                color="dark"
                label-color="dark"
                options-dark
                popup-content-class="text-dark"
              />
            </div>
          </div>

          <q-input
            v-model="form.biografia"
            label="Biografía *"
            type="textarea"
            rows="3"
            outlined
            :rules="[val => !!val || 'Campo requerido']"
            placeholder="Describe la personalidad de tu planta..."
            color="dark"
            label-color="dark"
          />

        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn label="Cancelar" color="grey" flat v-close-popup />
        <q-btn 
          label="Crear Perfil" 
          color="green-6" 
          :disable="!form.nombre || !form.tipo || !form.biografia || !form.imagen"
          @click="crearPerfil"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { crearPerfilPlanta, TIPOS_PLANTA } from '../data/plants.js';

const emit = defineEmits(['creado']); 

const showDialog = ref(false);
const isSubmitting = ref(false);
const archivoImagen = ref(null);

const form = reactive({
  nombre: '',
  tipo: '',
  edad: '1 año',
  luz: 'Luz indirecta',
  agua: 'Moderada', 
  temperatura: '18-24°C',
  biografia: '',
  imagen: ''
});

const opcionesLuz = ['Sol directo', 'Luz indirecta brillante', 'Luz indirecta', 'Sombra parcial', 'Sombra'];
const opcionesAgua = ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'];
const opcionesTemperatura = ['15-21°C', '18-24°C', '18-27°C', '20-28°C', '20-30°C'];

const procesarImagen = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.imagen = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const open = () => {
  showDialog.value = true;
};

const resetForm = () => {
  Object.assign(form, {
    nombre: '',
    tipo: '',
    edad: '1 año',
    luz: 'Luz indirecta',
    agua: 'Moderada',
    temperatura: '18-24°C', 
    biografia: '',
    imagen: ''
  });
  archivoImagen.value = null;
  isSubmitting.value = false;
};

const crearPerfil = async () => {
  if (isSubmitting.value) return;
  
  if (!form.nombre || !form.tipo || !form.biografia || !form.imagen) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    crearPerfilPlanta({
      nombre: form.nombre,
      tipo: form.tipo,  
      edad: form.edad,
      luz: form.luz,
      agua: form.agua,
      temperatura: form.temperatura,
      biografia: form.biografia,
      imagen: form.imagen
    });
    
    showDialog.value = false;
    resetForm();
    emit('creado'); 
    
  } catch (error) {
    console.error('Error creando perfil:', error);
  } finally {
    isSubmitting.value = false;
  }
};

defineExpose({ open });
</script>