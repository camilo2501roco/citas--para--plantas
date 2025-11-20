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
                <!-- Vista previa -->
                <q-img 
                  v-if="form.image"
                  :src="form.image" 
                  style="width: 80px; height: 80px; border-radius: 50%;"
                  class="q-mb-sm"
                />
                
                <!-- Subida de imagen -->
                <q-file
                  v-model="imageFile"
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
                v-model="form.name"
                label="Nombre de la planta *"
                outlined
                :rules="[val => !!val || 'Campo requerido']"
                color="dark"
                label-color="dark"
              />
              
              <q-select
                v-model="form.type"
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
            v-model="form.age"
            label="Edad"
            outlined
            placeholder="Ej: 2 años, 6 meses"
            color="dark"
            label-color="dark"
          />

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-select
                v-model="form.light"
                :options="lightOptions"
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
                v-model="form.water"
                :options="waterOptions"
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
                v-model="form.temperature"
                :options="temperatureOptions"
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
            v-model="form.bio"
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
          :disable="!form.name || !form.type || !form.bio || !form.image"
          @click="createProfile"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { crearPerfilPlanta, TIPOS_PLANTA } from '../data/plants.js';

const emit = defineEmits(['created']);

const showDialog = ref(false);
const isSubmitting = ref(false);
const imageFile = ref(null);

const form = reactive({
  name: '',
  type: '',
  age: '1 año',
  light: 'Luz indirecta',
  water: 'Moderada', 
  temperature: '18-24°C',
  bio: '',
  image: ''
});

const lightOptions = ['Sol directo', 'Luz indirecta brillante', 'Luz indirecta', 'Sombra parcial', 'Sombra'];
const waterOptions = ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'];
const temperatureOptions = ['15-21°C', '18-24°C', '18-27°C', '20-28°C', '20-30°C'];

const procesarImagen = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.image = e.target.result; // Guarda como Data URL
    };
    reader.readAsDataURL(file);
  }
};

const open = () => {
  showDialog.value = true;
};

const resetForm = () => {
  Object.assign(form, {
    name: '',
    type: '',
    age: '1 año',
    light: 'Luz indirecta',
    water: 'Moderada',
    temperature: '18-24°C', 
    bio: '',
    image: ''
  });
  imageFile.value = null;
  isSubmitting.value = false;
};

const createProfile = async () => {
  if (isSubmitting.value) return;
  
  if (!form.name || !form.type || !form.bio || !form.image) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    crearPerfilPlanta({
      nombre: form.name,
      tipo: form.type,  
      edad: form.age,
      luz: form.light,
      agua: form.water,
      temperatura: form.temperature,
      biografia: form.bio,
      imagen: form.image
    });
    
    showDialog.value = false;
    resetForm();
    emit('created');
    
  } catch (error) {
    console.error('Error creando perfil:', error);
  } finally {
    isSubmitting.value = false;
  }
};

defineExpose({ open });
</script>