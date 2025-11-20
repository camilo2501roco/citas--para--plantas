<template>
  <q-card-section class="bg-green-6 text-white">
    <div class="row items-center justify-between">
      <div class="row items-center q-col-gutter-sm">
        <q-btn 
          icon="arrow_back" 
          flat 
          round 
          dense
          @click="$emit('back')"
        />
        <div class="text-h3">{{ selectedPlant?.image }}</div>
        <div>
          <div class="text-h6 text-weight-bold">{{ selectedPlant?.name }}</div>
          <div class="text-caption">{{ selectedPlant?.type }}</div>
        </div>
      </div>
      <q-btn 
        icon="info" 
        flat 
        round 
        @click="$emit('get-advice')"
      >
        <q-tooltip>Consejos para la cita</q-tooltip>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script setup>
defineProps({
  selectedPlant: {
    type: Object,
    required: true
  }
});

defineEmits(['back', 'get-advice']);
</script>