<template>
  <q-card-section class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col">
        <q-input
          v-model="mensajeEntrada"
          :placeholder="`Escribe como ${miPlanta?.nombre}...`"
          outlined
          rounded
          dense
          @keyup.enter="enviarMensaje"
          :disable="estaCargando"
        />
      </div>
      <div class="col-auto">
        <q-btn 
          icon="send" 
          color="green-6" 
          round 
          @click="enviarMensaje"
          :disable="estaCargando || !mensajeEntrada.trim()"
        />
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  miPlanta: {
    type: Object,
    required: true
  },
  estaCargando: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['enviar']);

const mensajeEntrada = ref('');

const enviarMensaje = () => {
  if (!mensajeEntrada.value.trim()) return;
  emit('enviar', mensajeEntrada.value);
  mensajeEntrada.value = '';
};
</script>