<!-- AppHeader.vue -->
<template>
  <q-header elevated class="header-gradient">
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h5 text-weight-bold text-white">vivero citas</div>
      </q-toolbar-title>
      <q-chip v-if="miPlanta" color="white" text-color="green-8" icon="spa">
        {{ miPlanta.nombre }}
      </q-chip>
    </q-toolbar>

    <q-tabs v-model="pestanaActiva" align="center" class="tabs-gradient">
      <q-tab name="profiles" icon="local_florist" label="Perfiles" class="text-white" />
      <q-tab name="matches" icon="favorite" label="Matches" :disable="!miPlanta" class="text-white" />
      <q-tab name="chat" icon="chat" label="Chat" :disable="!plantaSeleccionada" class="text-white" />
    </q-tabs>
  </q-header>
</template>

<script setup>
import { inject } from 'vue';

defineProps({
  miPlanta: { type: Object, default: null }
});

const pestanaActiva = inject('pestanaActiva');
const plantaSeleccionada = inject('plantaSeleccionada');
</script>

<style scoped>




.tabs-gradient .q-tab {
  color: rgba(255, 255, 255, 0.7);
}

.tabs-gradient .q-tab--active {
  color: white;
}


.header-gradient {
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 50%, #81C784 100%) !important;
}

.tabs-gradient {
  background: linear-gradient(to right, #66BB6A, #4CAF50, #81C784) !important;
}



</style>