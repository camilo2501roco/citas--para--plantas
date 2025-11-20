<template>
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
                :class="compatibilityColor"
              >
                {{ compatibility }}%
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
            @click="$emit('start-chat')"
            unelevated
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  plant: {
    type: Object,
    required: true
  },
  compatibility: {
    type: Number,
    required: true
  }
});

defineEmits(['start-chat']);

const compatibilityColor = computed(() => {
  if (props.compatibility >= 70) return 'text-green-6';
  if (props.compatibility >= 50) return 'text-yellow-7';
  return 'text-orange-6';
});
</script>

<style scoped>
.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>