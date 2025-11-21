<template>
  <q-card-section 
    class="q-pa-md bg-green-1" 
    style="height: 400px; overflow-y: auto;"
    ref="messagesContainer"
  >
    <div v-if="messages.length === 0" class="text-center q-mt-xl">
      <q-icon name="favorite" size="xl" color="green-4" />
      <div class="text-h6 text-grey-6 q-mt-md">¡Comienza la conversación!</div>
    
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

    <div v-if="isLoading" class="row justify-start q-mb-md">
      <q-spinner-dots size="md" color="green-6" />
    </div>
  </q-card-section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  myPlant: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const messagesContainer = ref(null);

watch(() => props.messages.length, async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.$el.scrollTop = messagesContainer.value.$el.scrollHeight;
  }
});
</script>