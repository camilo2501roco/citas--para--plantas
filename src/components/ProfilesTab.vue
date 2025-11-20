<template>
  <div>
    <div class="row justify-between items-center q-mb-md">
      <div>
        <div class="text-h4 text-weight-bold q-mb-sm">
          {{ myPlant ? 'Cambiar mi Planta' : 'Selecciona tu Planta' }}
        </div>
        <div class="text-subtitle1 text-grey-7">
          Elige la planta que representarás en PlantMatch
        </div>
      </div>
      
      <q-btn 
        color="green-6" 
        icon="add" 
        label="Crear Perfil" 
        @click="openCreateDialog"
        unelevated
      />
    </div>
    
    <div class="row q-col-gutter-md">
      <div v-for="plant in plantProfiles" :key="plant.id" class="col-12 col-md-6">
        <PlantCard 
          :plant="plant" 
          @click="selectPlant(plant)"
        />
      </div>
    </div>

    <CreateProfileDialog 
      ref="createProfileDialog" 
      @created="loadProfiles"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import PlantCard from './PlantCard.vue';
import CreateProfileDialog from './CreateProfileDialog.vue';
import { getPlantProfiles } from '../data/plants.js';

const props = defineProps({
  myPlant: {
    type: Object,
    default: null
  }
});

const createProfileDialog = ref();
const plantProfiles = ref([]);

const emit = defineEmits(['select-plant']);

const loadProfiles = () => {
  plantProfiles.value = getPlantProfiles();
};

const openCreateDialog = () => {
  if (createProfileDialog.value?.open) {
    createProfileDialog.value.open();
  }
};

const selectPlant = (plant) => {
  emit('select-plant', plant);
};

onMounted(() => {
  loadProfiles();
});
</script>