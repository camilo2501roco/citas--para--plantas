<template>
  <div>
    <div class="row justify-between items-center q-mb-md  ">
      <div>
       
        <div class="text-subtitle1 text-yellow-1">
          Elige la planta que representarás en PlanMatch
        </div>
      </div>
      
      <q-btn 
        color="green-6" 
        icon="add" 
        label="Crear Perfil" 
        @click="abrirDialogoCrear"
        unelevated
      />
    </div>
    
    <div class="row q-col-gutter-md">
      <div v-for="planta in perfilesPlantas" :key="planta.id" class="col-12 col-md-6">
        <PlantCard 
          :planta="planta" 
          @click="seleccionarPlanta(planta)"
        />
      </div>
    </div>

    <CreateProfileDialog 
      ref="dialogoCrearPerfil" 
      @creado="cargarPerfiles"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlantCard from './PlantCard.vue';
import CreateProfileDialog from './CreateProfileDialog.vue';
import { obtenerPerfilesPlantas } from '../data/plants.js';

defineProps({
  miPlanta: { type: Object, default: null }
});

const emit = defineEmits(['seleccionar-planta']);

const dialogoCrearPerfil = ref();
const perfilesPlantas = ref([]);

const cargarPerfiles = () => {
  perfilesPlantas.value = obtenerPerfilesPlantas();
};

const abrirDialogoCrear = () => {
  if (dialogoCrearPerfil.value?.open) {
    dialogoCrearPerfil.value.open();
  }
};

const seleccionarPlanta = (planta) => {
  emit('seleccionar-planta', planta);
};

onMounted(() => {
  cargarPerfiles();
});
</script>
