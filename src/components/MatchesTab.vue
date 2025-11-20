<template>
  <div>
    <div class="text-h4 text-weight-bold q-mb-sm">
      Matches para {{ myPlant?.name }}
    </div>
    <div class="text-subtitle1 text-grey-7 q-mb-md">
      Plantas compatibles según sus necesidades
    </div>

    <div class="row q-col-gutter-md">
      <div 
        v-for="plant in sortedMatches" 
        :key="plant.id" 
        class="col-12 col-md-6"
      >
        <MatchCard 
          :plant="plant" 
          :compatibility="plant.compatibility"
          @start-chat="$emit('start-chat', plant)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import MatchCard from './MatchCard.vue';

// ✅ Asegurar que las props estén definidas
defineProps({
  myPlant: {
    type: Object,
    default: null
  },
  sortedMatches: {
    type: Array,
    required: true
  }
});

defineEmits(['start-chat']);
</script>