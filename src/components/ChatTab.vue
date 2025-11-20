<template>
  <q-card flat bordered>
    <ChatHeader 
      :selected-plant="selectedPlant"
      @back="$emit('back')"
      @get-advice="$emit('get-advice')"
    />

    <ChatMessages 
      :messages="messages"
      :my-plant="myPlant"
      :is-loading="isLoading"
    />

    <ChatInput 
      :my-plant="myPlant"
      :is-loading="isLoading"
      @send="$emit('send-message', $event)"
    />
  </q-card>
</template>

<script setup>
import ChatHeader from './ChatHeader.vue';
import ChatMessages from './ChatMessages.vue';
import ChatInput from './ChatInput.vue';

defineProps({
  myPlant: {
    type: Object,
    required: true
  },
  selectedPlant: {
    type: Object,
    required: true
  },
  messages: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['back', 'send-message', 'get-advice']);
</script>