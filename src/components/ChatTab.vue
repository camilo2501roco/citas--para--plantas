<template>
  <q-card flat bordered>
    <!-- Header del chat -->
    <ChatHeader
      :planta-seleccionada="plantaSeleccionada"
      @volver="$emit('volver')"
      @obtener-consejos="$emit('obtener-consejos')"
    />

    <!-- Área de mensajes -->
    <ChatMessages
      :mensajes="mensajes"
      :mi-planta="miPlanta"
      :esta-cargando="estaCargando"
    />

    <!-- Input para escribir -->
    <ChatInput
      :mi-planta="miPlanta"
      :esta-cargando="estaCargando"
      @enviar="$emit('enviar-mensaje', $event)"
    />
  </q-card>
</template>

<script setup>
import ChatHeader from './ChatHeader.vue';
import ChatMessages from './ChatMessages.vue';
import ChatInput from './ChatInput.vue';

defineProps({
  miPlanta: { type: Object, required: true },
  plantaSeleccionada: { type: Object, required: true },
  mensajes: { type: Array, required: true },
  estaCargando: { type: Boolean, default: false }
});

defineEmits(['volver', 'enviar-mensaje', 'obtener-consejos']);
</script>