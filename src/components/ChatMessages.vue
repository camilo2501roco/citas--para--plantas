<template>
  <q-card-section 
    class="q-pa-md bg-green-1" 
    style="height: 400px; overflow-y: auto;"
    ref="contenedorMensajes"
  >
    <div v-if="mensajes.length === 0" class="text-center q-mt-xl">
      <q-icon name="favorite" size="xl" color="green-4" />
      <div class="text-h6 text-grey-6 q-mt-md">¡Comienza la conversación!</div>
      <div class="text-body2 text-grey-5">Escribe como {{ miPlanta?.nombre }}</div>
    </div>

    <div v-for="(msg, idx) in mensajes" :key="idx" class="q-mb-md">
      <div 
        class="row"
        :class="msg.remitente === 'usuario' ? 'justify-end' : 'justify-start'"
      >
        <q-chat-message
          :text="[msg.texto]"
          :sent="msg.remitente === 'usuario'"
          :bg-color="msg.remitente === 'usuario' ? 'brown-10' : 'white'"
          :text-color="msg.remitente === 'usuario' ? 'white' : 'grey-9'"
          :name="msg.planta"
        />
      </div>
    </div>

    <div v-if="estaCargando" class="row justify-start q-mb-md">
      <q-spinner-dots size="md" color="green-6" />
    </div>
  </q-card-section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  mensajes: {
    type: Array,
    required: true
  },
  miPlanta: {
    type: Object,
    required: true
  },
  estaCargando: {
    type: Boolean,
    default: false
  }
});

const contenedorMensajes = ref(null);

watch(() => props.mensajes.length, async () => {
  await nextTick();
  if (contenedorMensajes.value) {
    contenedorMensajes.value.$el.scrollTop = contenedorMensajes.value.$el.scrollHeight;
  }
});
</script>
