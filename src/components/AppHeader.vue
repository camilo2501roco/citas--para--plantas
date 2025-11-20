<!-- AppHeader.vue -->
<template>
  <q-header elevated class="bg-gradient-green">
    <q-toolbar>
      <q-icon name="favorite" size="md" color="pink-3" />
      <q-toolbar-title>
        <div class="text-h5 text-weight-bold">vivero citas</div>
        <div class="text-caption">Encuentra el match perfecto para tu planta</div>
      </q-toolbar-title>
      <q-chip v-if="miPlanta" color="white" text-color="green-8" icon="spa">
        {{ miPlanta.nombre }}
      </q-chip>
    </q-toolbar>

    <q-tabs v-model="pestanaActiva" align="center" class="bg-white text-green-8">
      <q-tab name="profiles" icon="local_florist" label="Perfiles" />
      <q-tab name="matches" icon="favorite" label="Matches" :disable="!miPlanta" />
      <q-tab name="chat" icon="chat" label="Chat" :disable="!plantaSeleccionada" />
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
.bg-gradient-green {
  background: linear-gradient(to right, #059669, #0d9488);
}
</style>