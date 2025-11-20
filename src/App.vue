<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader :my-plant="myPlant" />

    <q-page-container>
      <q-page class="bg-green-1 q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <q-tab-panels v-model="activeTab" animated>
              <q-tab-panel name="profiles">
                <!-- ✅ CORREGIDO: Pasar la prop myPlant -->
                <ProfilesTab 
                  :my-plant="myPlant"
                  @select-plant="selectMyPlant"
                />
              </q-tab-panel>

              <q-tab-panel name="matches">
                <MatchesTab
                  :my-plant="myPlant"
                  :sorted-matches="sortedMatches"
                  @start-chat="startChat"
                />
              </q-tab-panel>

              <q-tab-panel name="chat" class="q-pa-none">
                <ChatTab
                  :my-plant="myPlant"
                  :selected-plant="selectedPlant"
                  :messages="messages"
                  :is-loading="isLoading"
                  @back="activeTab = 'matches'"
                  @send-message="sendMessage"
                  @get-advice="getDateAdvice"
                />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <AdviceDialog
      v-model="showAdvice"
      :advice="advice"
      :is-loading="isLoading"
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
import { getPlantProfiles } from './data/plants.js';
import { checkCompatibility } from './utils/compatibility.js';
import { sendMessageToGemini, getAdviceFromGemini } from './services/gemini.js';

const activeTab = ref('profiles');
const myPlant = ref(null);
const selectedPlant = ref(null);
const messages = ref([]);
const isLoading = ref(false);
const showAdvice = ref(false);
const advice = ref('');

// Provide para componentes hijos
provide('activeTab', activeTab);
provide('selectedPlant', selectedPlant);

const selectMyPlant = (plant) => {
  myPlant.value = plant;
  activeTab.value = 'matches';
};

const startChat = (plant) => {
  selectedPlant.value = plant;
  messages.value = [];
  activeTab.value = 'chat';
};

const sortedMatches = computed(() => {
  if (!myPlant.value) return [];
  
  const profiles = getPlantProfiles();
  
  return profiles
    .filter(p => p.id !== myPlant.value.id)
    .map(plant => ({
      ...plant,
      compatibility: checkCompatibility(myPlant.value, plant)
    }))
    .sort((a, b) => b.compatibility - a.compatibility);
});

const sendMessage = async (messageText) => {
  const userMessage = {
    sender: 'user',
    text: messageText,
    plant: myPlant.value.name
  };

  messages.value.push(userMessage);
  isLoading.value = true;

  try {
    const aiResponse = await sendMessageToGemini(
      myPlant.value,
      selectedPlant.value,
      messageText
    );

    messages.value.push({
      sender: 'ai',
      text: aiResponse,
      plant: selectedPlant.value.name
    });
  } catch (error) {
    console.error('Error:', error);
    messages.value.push({
      sender: 'ai',
      text: '¡Ups! Parece que hay problemas con mi fotosíntesis. Intenta de nuevo. 🌿',
      plant: selectedPlant.value.name
    });
  } finally {
    isLoading.value = false;
  }
};

const getDateAdvice = async () => {
  if (!myPlant.value || !selectedPlant.value) return;
  
  isLoading.value = true;
  showAdvice.value = true;

  try {
    const aiAdvice = await getAdviceFromGemini(myPlant.value, selectedPlant.value);
    advice.value = aiAdvice;
  } catch (error) {
    console.error('Error:', error);
    advice.value = 'Error al obtener consejos. Por favor intenta de nuevo.';
  } finally {
    isLoading.value = false;
  }
};
</script>