<template>
  <q-header elevated class="bg-gradient-to-r from-green-600 to-teal-600">
    <q-toolbar>
      <q-icon name="favorite" size="md" color="pink-3" />
      <q-toolbar-title>
        <div class="text-h5 text-weight-bold">PlantMatch 🌱💚</div>
        <div class="text-caption">Encuentra el match perfecto para tu planta</div>
      </q-toolbar-title>
      <q-chip v-if="myPlant" color="white" text-color="green-8" icon="spa">
        {{ myPlant.name }}
      </q-chip>
    </q-toolbar>

    <q-tabs v-model="activeTab" align="center" class="bg-white text-green-8">
      <q-tab name="profiles" icon="local_florist" label="Perfiles" />
      <q-tab name="matches" icon="favorite" label="Matches" :disable="!myPlant" />
      <q-tab name="chat" icon="chat" label="Chat" :disable="!selectedPlant" />
    </q-tabs>
  </q-header>
</template>

<script setup>
import { inject } from 'vue';

defineProps({
  myPlant: {
    type: Object,
    default: null
  }
});

const activeTab = inject('activeTab');
const selectedPlant = inject('selectedPlant');
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, #059669, #0d9488);
}
</style>