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
                <div class="text-h2 q-mb-sm">{{ form.image }}</div>
                <q-select
                  v-model="form.image"
                  :options="plantEmojis"
                  label="Emoji"
                  outlined
                  dense
                  emit-value
                  map-options
                  color="dark"
                  label-color="dark"
                  options-dark
                  popup-content-class="text-dark"
                />
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
                :options="PLANT_TYPES"
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
          :disable="!form.name || !form.type || !form.bio"
          @click="createProfile"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { createPlantProfile, PLANT_TYPES } from '../data/plants.js';

const emit = defineEmits(['created']);

const showDialog = ref(false);
const isSubmitting = ref(false);

const form = reactive({
  name: '',
  type: '',
  age: '1 año',
  light: 'Luz indirecta',
  water: 'Moderada', 
  temperature: '18-24°C',
  bio: '',
  image: '🌱'
});

const plantEmojis = [
  { label: '🌱 Planta pequeña', value: '🌱' },
  { label: '🌿 Planta verde', value: '🌿' },
  { label: '🍃 Hoja', value: '🍃' },
  { label: '🌺 Flor rosa', value: '🌺' },
  { label: '🌷 Tulipán', value: '🌷' },
  { label: '🌹 Rosa', value: '🌹' },
  { label: '🌸 Flor de cerezo', value: '🌸' },
  { label: '💐 Ramo', value: '💐' },
  { label: '🌼 Margarita', value: '🌼' },
  { label: '🎍 Bambú', value: '🎍' },
  { label: '🪴 Maceta', value: '🪴' },
  { label: '🌵 Cactus', value: '🌵' },
  { label: '🎋 Bambú decorativo', value: '🎋' },
  { label: '🍀 Trébol', value: '🍀' }
];

const lightOptions = ['Sol directo', 'Luz indirecta brillante', 'Luz indirecta', 'Sombra parcial', 'Sombra'];
const waterOptions = ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'];
const temperatureOptions = ['15-21°C', '18-24°C', '18-27°C', '20-28°C', '20-30°C'];

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
    image: '🌱'
  });
  isSubmitting.value = false;
};

const createProfile = async () => {
  if (isSubmitting.value) return;
  
  if (!form.name || !form.type || !form.bio) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    createPlantProfile(form);
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