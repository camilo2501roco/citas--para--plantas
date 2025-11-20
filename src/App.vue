<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
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

      <!-- Tabs -->
      <q-tabs v-model="activeTab" align="center" class="bg-white text-green-8">
        <q-tab name="profiles" icon="local_florist" label="Perfiles" />
        <q-tab name="matches" icon="favorite" label="Matches" :disable="!myPlant" />
        <q-tab name="chat" icon="chat" label="Chat" :disable="!selectedPlant" />
      </q-tabs>
    </q-header>

    <!-- Page Content -->
    <q-page-container>
      <q-page class="bg-green-1 q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <!-- Tab: Perfiles -->
            <q-tab-panels v-model="activeTab" animated>
              <q-tab-panel name="profiles">
                <div class="text-h4 text-weight-bold q-mb-sm">
                  {{ myPlant ? 'Cambiar mi Planta' : 'Selecciona tu Planta' }}
                </div>
                <div class="text-subtitle1 text-grey-7 q-mb-md">
                  Elige la planta que representarás en PlantMatch
                </div>
                
                <div class="row q-col-gutter-md">
                  <div v-for="plant in plantProfiles" :key="plant.id" class="col-12 col-md-6">
                    <q-card 
                      class="cursor-pointer transition-all hover-card" 
                      @click="selectMyPlant(plant)"
                      bordered
                      flat
                    >
                      <q-card-section>
                        <div class="row items-start q-col-gutter-md">
                          <div class="col-auto">
                            <div class="text-h1">{{ plant.image }}</div>
                          </div>
                          <div class="col">
                            <div class="text-h6 text-weight-bold">{{ plant.name }}</div>
                            <div class="text-caption text-grey-7">{{ plant.type }} • {{ plant.age }}</div>
                            <div class="text-body2 q-mt-sm">{{ plant.bio }}</div>
                            
                            <div class="q-mt-md">
                              <q-chip size="sm" color="yellow-2" text-color="grey-8" icon="wb_sunny">
                                {{ plant.light }}
                              </q-chip>
                              <q-chip size="sm" color="blue-2" text-color="grey-8" icon="water_drop">
                                {{ plant.water }}
                              </q-chip>
                              <q-chip size="sm" color="grey-3" text-color="grey-8" icon="thermostat">
                                {{ plant.temperature }}
                              </q-chip>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Tab: Matches -->
              <q-tab-panel name="matches">
                <div class="text-h4 text-weight-bold q-mb-sm">
                  Matches para {{ myPlant?.name }}
                </div>
                <div class="text-subtitle1 text-grey-7 q-mb-md">
                  Plantas compatibles según sus necesidades
                </div>

                <div class="row q-col-gutter-md">
                  <div 
                    v-for="plant in sortedMatches" 
                    :key="plant.id" 
                    class="col-12 col-md-6"
                  >
                    <q-card bordered flat class="hover-card">
                      <q-card-section>
                        <div class="row items-start q-col-gutter-md">
                          <div class="col-auto">
                            <div class="text-h1">{{ plant.image }}</div>
                          </div>
                          <div class="col">
                            <div class="row items-start justify-between">
                              <div>
                                <div class="text-h6 text-weight-bold">{{ plant.name }}</div>
                                <div class="text-caption text-grey-7">{{ plant.type }} • {{ plant.age }}</div>
                              </div>
                              <div class="text-center">
                                <div 
                                  class="text-h4 text-weight-bold"
                                  :class="getCompatibilityColor(plant.compatibility)"
                                >
                                  {{ plant.compatibility }}%
                                </div>
                                <div class="text-caption text-grey-6">match</div>
                              </div>
                            </div>
                            
                            <div class="text-body2 q-mt-sm">{{ plant.bio }}</div>
                            
                            <q-btn 
                              class="full-width q-mt-md"
                              color="green-6"
                              label="Iniciar Chat"
                              icon="chat"
                              @click="startChat(plant)"
                              unelevated
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Tab: Chat -->
              <q-tab-panel name="chat" class="q-pa-none">
                <q-card flat bordered>
                  <!-- Chat Header -->
                  <q-card-section class="bg-green-6 text-white">
                    <div class="row items-center justify-between">
                      <div class="row items-center q-col-gutter-sm">
                        <q-btn 
                          icon="arrow_back" 
                          flat 
                          round 
                          dense
                          @click="activeTab = 'matches'"
                        />
                        <div class="text-h3">{{ selectedPlant?.image }}</div>
                        <div>
                          <div class="text-h6 text-weight-bold">{{ selectedPlant?.name }}</div>
                          <div class="text-caption">{{ selectedPlant?.type }}</div>
                        </div>
                      </div>
                      <q-btn 
                        icon="info" 
                        flat 
                        round 
                        @click="getDateAdvice"
                        title="Consejos para la cita"
                      >
                        <q-tooltip>Consejos para la cita</q-tooltip>
                      </q-btn>
                    </div>
                  </q-card-section>

                  <!-- Messages -->
                  <q-card-section 
                    class="q-pa-md bg-green-1" 
                    style="height: 400px; overflow-y: auto;"
                    ref="messagesContainer"
                  >
                    <div v-if="messages.length === 0" class="text-center q-mt-xl">
                      <q-icon name="favorite" size="xl" color="green-4" />
                      <div class="text-h6 text-grey-6 q-mt-md">¡Comienza la conversación!</div>
                      <div class="text-body2 text-grey-5">Escribe como {{ myPlant?.name }}</div>
                    </div>

                    <div v-for="(msg, idx) in messages" :key="idx" class="q-mb-md">
                      <div 
                        class="row"
                        :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
                      >
                        <q-chat-message
                          :text="[msg.text]"
                          :sent="msg.sender === 'user'"
                          :bg-color="msg.sender === 'user' ? 'green-6' : 'white'"
                          :text-color="msg.sender === 'user' ? 'white' : 'grey-9'"
                          :name="msg.plant"
                        />
                      </div>
                    </div>

                    <div v-if="isLoading && !showAdvice" class="row justify-start q-mb-md">
                      <q-spinner-dots size="md" color="green-6" />
                    </div>
                  </q-card-section>

                  <!-- Input -->
                  <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                      <div class="col">
                        <q-input
                          v-model="inputMessage"
                          :placeholder="`Escribe como ${myPlant?.name}...`"
                          outlined
                          rounded
                          dense
                          @keyup.enter="sendMessage"
                          :disable="isLoading"
                        />
                      </div>
                      <div class="col-auto">
                        <q-btn 
                          icon="send" 
                          color="green-6" 
                          round 
                          @click="sendMessage"
                          :disable="isLoading || !inputMessage.trim()"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- Advice Dialog -->
    <q-dialog v-model="showAdvice">
      <q-card style="min-width: 350px; max-width: 600px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            <q-icon name="favorite" color="red" /> Consejos para la Primera Cita
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="isLoading" class="text-center q-pa-xl">
            <q-spinner color="green-6" size="lg" />
            <div class="text-body2 text-grey-7 q-mt-md">
              Generando consejos personalizados...
            </div>
          </div>
          <div v-else class="text-body1" style="white-space: pre-wrap;">
            {{ advice }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cerrar" color="green-6" flat v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

const activeTab = ref('profiles');
const myPlant = ref(null);
const selectedPlant = ref(null);
const messages = ref([]);
const inputMessage = ref('');
const isLoading = ref(false);
const showAdvice = ref(false);
const advice = ref('');
const messagesContainer = ref(null);

const plantProfiles = [
  {
    id: 1,
    name: 'Bella la Begonia',
    type: 'Begonia',
    age: '2 años',
    light: 'Sombra parcial',
    water: 'Moderada',
    temperature: '18-24°C',
    bio: '¡Hola! Soy una begonia coqueta que ama la humedad y las conversaciones profundas. Busco una compañera que disfrute del ambiente tropical.',
    image: '🌺',
    compatibility: ['Helecho', 'Pothos', 'Calathea']
  },
  {
    id: 2,
    name: 'Carlos el Cactus',
    type: 'Cactus',
    age: '5 años',
    light: 'Sol directo',
    water: 'Baja',
    temperature: '20-30°C',
    bio: 'Soy un cactus independiente y resistente. Me gusta el sol y no necesito mucha atención. Busco alguien que respete mi espacio.',
    image: '🌵',
    compatibility: ['Suculenta', 'Aloe Vera', 'Echeveria']
  },
  {
    id: 3,
    name: 'Penélope Pothos',
    type: 'Pothos',
    age: '3 años',
    light: 'Luz indirecta',
    water: 'Moderada',
    temperature: '18-27°C',
    bio: 'Planta adaptable y fácil de llevar. Me encanta trepar y explorar nuevos espacios. Busco una relación sin complicaciones.',
    image: '🌿',
    compatibility: ['Filodendro', 'Monstera', 'Begonia']
  },
  {
    id: 4,
    name: 'Fernando el Helecho',
    type: 'Helecho',
    age: '1 año',
    light: 'Sombra',
    water: 'Alta',
    temperature: '15-21°C',
    bio: 'Romántico empedernido que ama la humedad y los ambientes frescos. Busco una planta sensible que aprecie la delicadeza.',
    image: '🌱',
    compatibility: ['Begonia', 'Calathea', 'Orquídea']
  },
  {
    id: 5,
    name: 'Sofía la Suculenta',
    type: 'Suculenta',
    age: '4 años',
    light: 'Sol directo',
    water: 'Muy baja',
    temperature: '20-28°C',
    bio: 'Minimalista y eficiente. Almaceno agua y emociones. Perfecto para alguien que valore la autosuficiencia.',
    image: '🪴',
    compatibility: ['Cactus', 'Aloe Vera', 'Echeveria']
  },
  {
    id: 6,
    name: 'Martín la Monstera',
    type: 'Monstera',
    age: '3 años',
    light: 'Luz indirecta brillante',
    water: 'Moderada',
    temperature: '18-27°C',
    bio: 'Planta extrovertida con hojas fenestradas únicas. Me gusta ser el centro de atención y crecer sin límites.',
    image: '🍃',
    compatibility: ['Pothos', 'Filodendro', 'Alocasia']
  }
];

const selectMyPlant = (plant) => {
  myPlant.value = plant;
  activeTab.value = 'matches';
};

const startChat = (plant) => {
  selectedPlant.value = plant;
  messages.value = [];
  activeTab.value = 'chat';
};

const checkCompatibility = (plant) => {
  if (!myPlant.value) return 0;
  
  let score = 0;
  if (myPlant.value.compatibility.includes(plant.type)) score += 40;
  
  const lightCompatibility = {
    'Sol directo': ['Sol directo', 'Luz indirecta brillante'],
    'Luz indirecta': ['Luz indirecta', 'Luz indirecta brillante', 'Sombra parcial'],
    'Luz indirecta brillante': ['Luz indirecta', 'Luz indirecta brillante', 'Sol directo'],
    'Sombra parcial': ['Sombra', 'Sombra parcial', 'Luz indirecta'],
    'Sombra': ['Sombra', 'Sombra parcial']
  };
  
  if (lightCompatibility[myPlant.value.light]?.includes(plant.light)) score += 30;
  
  const waterLevels = ['Muy baja', 'Baja', 'Moderada', 'Alta'];
  const myWaterIndex = waterLevels.indexOf(myPlant.value.water);
  const plantWaterIndex = waterLevels.indexOf(plant.water);
  const waterDiff = Math.abs(myWaterIndex - plantWaterIndex);
  score += Math.max(0, 30 - (waterDiff * 10));
  
  return Math.min(100, score);
};

const sortedMatches = computed(() => {
  if (!myPlant.value) return [];
  
  return plantProfiles
    .filter(p => p.id !== myPlant.value.id)
    .map(plant => ({
      ...plant,
      compatibility: checkCompatibility(plant)
    }))
    .sort((a, b) => b.compatibility - a.compatibility);
});

const getCompatibilityColor = (compatibility) => {
  if (compatibility >= 70) return 'text-green-6';
  if (compatibility >= 50) return 'text-yellow-7';
  return 'text-orange-6';
};

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return;

  const userMessage = {
    sender: 'user',
    text: inputMessage.value,
    plant: myPlant.value.name
  };

  messages.value.push(userMessage);
  inputMessage.value = '';
  isLoading.value = true;

  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.$el.scrollTop = messagesContainer.value.$el.scrollHeight;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Eres ${selectedPlant.value.name}, una planta ${selectedPlant.value.type}. Tu personalidad es: ${selectedPlant.value.bio}. 
            Estás chateando con ${myPlant.value.name}, una ${myPlant.value.type}.
            
            Responde de manera breve, amigable y con la personalidad de tu tipo de planta. Usa emojis ocasionalmente.
            Menciona tus necesidades de luz (${selectedPlant.value.light}), agua (${selectedPlant.value.water}) y temperatura (${selectedPlant.value.temperature}) de forma natural en la conversación.
            
            Mensaje recibido: "${userMessage.text}"
            
            Responde como ${selectedPlant.value.name} en primera persona, de forma casual y coqueta si es apropiado.`
          }
        ]
      })
    });

    const data = await response.json();
    const aiResponse = data.content.find(item => item.type === 'text')?.text || 'Lo siento, no pude responder.';

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
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.$el.scrollTop = messagesContainer.value.$el.scrollHeight;
    }
  }
};

const getDateAdvice = async () => {
  if (!myPlant.value || !selectedPlant.value) return;
  
  isLoading.value = true;
  showAdvice.value = true;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Dame consejos divertidos y creativos para una "primera cita en el vivero" entre:
            
            Planta 1: ${myPlant.value.name} (${myPlant.value.type})
            - Luz: ${myPlant.value.light}
            - Agua: ${myPlant.value.water}
            - Temperatura: ${myPlant.value.temperature}
            - Bio: ${myPlant.value.bio}
            
            Planta 2: ${selectedPlant.value.name} (${selectedPlant.value.type})
            - Luz: ${selectedPlant.value.light}
            - Agua: ${selectedPlant.value.water}
            - Temperatura: ${selectedPlant.value.temperature}
            - Bio: ${selectedPlant.value.bio}
            
            Incluye:
            1. El lugar ideal en el vivero para la cita
            2. Temas de conversación recomendados
            3. Qué hacer y qué evitar
            4. Un tip especial basado en su compatibilidad
            
            Sé creativo, divertido y mantén el tono romántico pero profesional sobre plantas.`
          }
        ]
      })
    });

    const data = await response.json();
    const aiAdvice = data.content.find(item => item.type === 'text')?.text || 'No pude generar consejos en este momento.';
    advice.value = aiAdvice;
  } catch (error) {
    console.error('Error:', error);
    advice.value = 'Error al obtener consejos. Por favor intenta de nuevo.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #059669, #0d9488);
}
</style>