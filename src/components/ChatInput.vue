<template>
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
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  myPlant: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['send']);

const inputMessage = ref('');

const sendMessage = () => {
  if (!inputMessage.value.trim()) return;
  emit('send', inputMessage.value);
  inputMessage.value = '';
};
</script>