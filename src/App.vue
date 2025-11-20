<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader :mi-planta="miPlanta" />

    <q-page-container>
      <q-page class="bg-green-1 q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <q-tab-panels v-model="pestanaActiva" animated>
              <q-tab-panel name="profiles">
                <ProfilesTab 
                  :mi-planta="miPlanta"
                  @seleccionar-planta="seleccionarMiPlanta"
                />
              </q-tab-panel>

              <q-tab-panel name="matches">
                <MatchesTab
                  :mi-planta="miPlanta"
                  :coincidencias-ordenadas="coincidenciasOrdenadas"
                  @iniciar-chat="iniciarChat"
                />
              </q-tab-panel>

              <q-tab-panel name="chat" class="q-pa-none">
                <ChatTab
                  :mi-planta="miPlanta"
                  :planta-seleccionada="plantaSeleccionada"
                  :mensajes="mensajes"
                  :esta-cargando="estaCargando"
                  @volver="pestanaActiva = 'matches'"
                  @enviar-mensaje="enviarMensaje"
                  @obtener-consejos="obtenerConsejoCita"
                />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <AdviceDialog
      v-model="mostrarConsejos"
      :consejo="consejo"
      :esta-cargando="estaCargando"
    />
  </q-layout>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ProfilesTab from './components/ProfilesTab.vue';
import MatchesTab from './components/MatchesTab.vue';
import ChatTab from './components/ChatTab.vue';
import AdviceDialog from './components/AdviceDialog.vue';
import { obtenerPerfilesPlantas } from './data/plants.js';
import { verificarCompatibilidad } from './utils/compatibility.js';
import { enviarMensajeGemini, obtenerConsejosGemini } from './services/gemini.js';

const pestanaActiva = ref('profiles');
const miPlanta = ref(null);
const plantaSeleccionada = ref(null);
const mensajes = ref([]);
const estaCargando = ref(false);
const mostrarConsejos = ref(false);
const consejo = ref('');

provide('pestanaActiva', pestanaActiva);
provide('plantaSeleccionada', plantaSeleccionada);

const seleccionarMiPlanta = (planta) => {
  miPlanta.value = planta;
  pestanaActiva.value = 'matches';
};

const iniciarChat = (planta) => {
  plantaSeleccionada.value = planta;
  mensajes.value = [];
  pestanaActiva.value = 'chat';
};

const coincidenciasOrdenadas = computed(() => {
  if (!miPlanta.value) return [];
  
  const perfiles = obtenerPerfilesPlantas();
  
  return perfiles
    .filter(p => p.id !== miPlanta.value.id)
    .map(planta => ({
      ...planta,
      compatibilidad: verificarCompatibilidad(miPlanta.value, planta)
    }))
    .sort((a, b) => b.compatibilidad - a.compatibilidad);
});

const enviarMensaje = async (textoMensaje) => {
  mensajes.value.push({
    remitente: 'usuario',
    texto: textoMensaje,
    planta: miPlanta.value.nombre
  });

  estaCargando.value = true;

  try {
    const respuestaIA = await enviarMensajeGemini(
      miPlanta.value,
      plantaSeleccionada.value,
      textoMensaje
    );

    mensajes.value.push({
      remitente: 'ia',
      texto: respuestaIA,
      planta: plantaSeleccionada.value.nombre
    });
  } catch (error) {
    console.error('Error:', error);
    mensajes.value.push({
      remitente: 'ia',
      texto: '¡Ups! Parece que hay problemas con mi fotosíntesis. Intenta de nuevo. 🌿',
      planta: plantaSeleccionada.value.nombre
    });
  } finally {
    estaCargando.value = false;
  }
};

const obtenerConsejoCita = async () => {
  if (!miPlanta.value || !plantaSeleccionada.value) return;
  
  estaCargando.value = true;
  mostrarConsejos.value = true;

  try {
    const consejoIA = await obtenerConsejosGemini(miPlanta.value, plantaSeleccionada.value);
    consejo.value = consejoIA;
  } catch (error) {
    console.error('Error:', error);
    consejo.value = 'Error al obtener consejos. Por favor intenta de nuevo.';
  } finally {
    estaCargando.value = false;
  }
};
</script>