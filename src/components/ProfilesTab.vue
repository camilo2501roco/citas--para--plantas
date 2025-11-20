<template>
  <div>
    <div class="text-h4 text-weight-bold q-mb-sm">
      {{ myPlant ? 'Cambiar mi Planta' : 'Selecciona tu Planta' }}
    </div>
    <div class="text-subtitle1 text-grey-7 q-mb-md">
      Elige la planta que representarás en PlantMatch
    </div>
    
    <div class="row q-col-gutter-md">
      <div v-for="plant in plantProfiles" :key="plant.id" class="col-12 col-md-6">
        <PlantCard :plant="plant" @click="$emit('select-plant', plant)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PlantCard from './PlantCard.vue';

defineProps({
  plantProfiles: {
    type: Array,
    required: true
  },
  myPlant: {
    type: Object,
    default: null
  }
});

defineEmits(['select-plant']);
</script>