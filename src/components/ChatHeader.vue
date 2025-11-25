<template>
  <q-card-section class="degradado" >
    <div class="row items-center justify-between">
      <div class="row items-center q-col-gutter-sm">
        <q-btn 
          icon="arrow_back" 
          flat 
          round 
          dense
          @click="$emit('volver')"
        />
        <q-img 
          :src="plantaSeleccionada?.imagen" 
          :alt="plantaSeleccionada?.nombre"
          class="plant-avatar"
          width="60px"
          height="60px"
          style="border-radius: 50%;"
        />
        <div>
          <div class="text-h6 text-weight-bold">{{ plantaSeleccionada?.nombre }}</div>
          <div class="text-caption">{{ plantaSeleccionada?.tipo }}</div>
        </div>
      </div>
      <q-btn 
        icon="info" 
        flat 
        round 
        @click="$emit('obtener-consejos')"
      >
        <q-tooltip>Consejos para la cita</q-tooltip>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script setup>
defineProps({
  plantaSeleccionada: {
    type: Object,
    required: true
  }
});

defineEmits(['volver', 'obtener-consejos']);
</script>
<style>
.degradado{
    background: linear-gradient(135deg, 
    #5A2A0A 0%, 
    #7A3B12 25%, 
    #9C4A1A 50%, 
    #BD5921 75%, 
    #5A2A0A 100%
  );


  color: white;
}
</style>