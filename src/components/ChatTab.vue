<template>
  <q-card flat bordered>
    <q-card-section class="bg-green-6 text-white">
      <div class="row items-center justify-between">
        <div class="row items-center q-col-gutter-sm">
          <q-btn icon="arrow_back" flat round dense @click="$emit('volver')" />
          <!-- CAMBIO AQUÍ: -->
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
        <q-btn icon="info" flat round @click="$emit('obtener-consejos')">
          <q-tooltip>Consejos para la cita</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

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
            :bg-color="msg.remitente === 'usuario' ? 'green-6' : 'white'"
            :text-color="msg.remitente === 'usuario' ? 'white' : 'grey-9'"
            :name="msg.planta"
          />
        </div>
      </div>

      <div v-if="estaCargando" class="row justify-start q-mb-md">
        <q-spinner-dots size="md" color="green-6" />
      </div>
    </q-card-section>

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
  </q-card>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  miPlanta: { type: Object, required: true },
  plantaSeleccionada: { type: Object, required: true },
  mensajes: { type: Array, required: true },
  estaCargando: { type: Boolean, default: false }
});

const emit = defineEmits(['volver', 'enviar-mensaje', 'obtener-consejos']);

const mensajeEntrada = ref('');
const contenedorMensajes = ref(null);

const enviarMensaje = () => {
  if (!mensajeEntrada.value.trim()) return;
  emit('enviar-mensaje', mensajeEntrada.value);
  mensajeEntrada.value = '';
};

watch(() => props.mensajes.length, async () => {
  await nextTick();
  if (contenedorMensajes.value) {
    contenedorMensajes.value.$el.scrollTop = contenedorMensajes.value.$el.scrollHeight;
  }
});
</script>