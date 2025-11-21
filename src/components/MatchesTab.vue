<template>
  <div >
    <div class="text-h4 text-yellow-1 q-mb-sm">
      Matches para {{ miPlanta?.nombre }}
    </div>
    <div class="text-subtitle1 text-yellow-1 q-mb-md">
      Plantas compatibles según sus necesidades
    </div>

    <div class="row q-col-gutter-md">
      <div 
        v-for="planta in coincidenciasOrdenadas" 
        :key="planta.id" 
        class="col-12 col-md-6"
      >
        <MatchCard 
          :planta="planta" 
          :compatibilidad="planta.compatibilidad"
          @iniciar-chat="$emit('iniciar-chat', planta)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MatchCard from './MatchCard.vue';

defineProps({
  miPlanta: { type: Object, default: null },
  coincidenciasOrdenadas: { type: Array, required: true }
});

defineEmits(['iniciar-chat']);
</script>

