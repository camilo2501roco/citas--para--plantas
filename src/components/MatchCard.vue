<template>
  <q-card bordered flat class="tarjeta-hover">
    <q-card-section>
      <div class="row items-start q-col-gutter-md">
        <div class="col-auto">
          <q-img 
            :src="planta.imagen" 
            :alt="planta.nombre"
            class="plant-avatar"
            width="60px"
            height="60px"
            style="border-radius: 50%;"
          />
        </div>
        <div class="col">
          <div class="row items-start justify-between">
            <div>
              <div class="text-h6 text-grey-5">{{ planta.nombre }}</div>
              <div class="text-caption text-grey-7">{{ planta.tipo }} • {{ planta.edad }}</div>
            </div>
            <div class="text-center">
              <div 
                class="text-h4 text-weight-bold"
                :class="colorCompatibilidad"
              >
                {{ compatibilidad }}%
              </div>
              <div class="text-caption text-grey-6">match</div>
            </div>
          </div>
          
          <div class="text-body2 q-mt-sm">{{ planta.biografia }}</div>
          
          <q-btn 
            class="full-width q-mt-md"
            color="green-6"
            label="Iniciar Chat"
            icon="chat"
            @click="$emit('iniciar-chat')"
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
  planta: { type: Object, required: true },
  compatibilidad: { type: Number, required: true }
});

defineEmits(['iniciar-chat']);

const colorCompatibilidad = computed(() => {
  if (props.compatibilidad >= 70) return 'text-green-6';
  if (props.compatibilidad >= 50) return 'text-yellow-7';
  return 'text-orange-6';
});
</script>

<style scoped>
.tarjeta-hover {
  transition: all 0.3s ease;
}
.tarjeta-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>
