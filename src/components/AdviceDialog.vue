<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card style="min-width: 350px; max-width: 600px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon name="favorite" color="red" /> Consejos para la Primera Cita
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center q-pa-xl">
          <q-spinner color="green-6" size="lg" />
          <div class="text-body2 text-grey-7 q-mt-md">
            Generando consejos personalizados...
          </div>
          <div class="text-caption text-grey-5 q-mt-sm">
            Esto puede tomar unos segundos
          </div>
        </div>
        
        <!-- Success State -->
        <div v-else-if="advice && advice.length > 0" class="text-body1" style="white-space: pre-wrap; color: #2c3e50;">
          {{ advice }}
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center q-pa-xl">
          <q-icon name="error_outline" size="lg" color="orange-6" />
          <div class="text-body2 text-grey-7 q-mt-md">
            No se pudieron generar consejos
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cerrar" color="green-6" flat v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  advice: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>