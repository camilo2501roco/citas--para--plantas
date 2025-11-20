<template>
  <q-card class="cursor-pointer tarjeta-hover" bordered flat @click="$emit('click')">
    <q-card-section>
      <div class="row items-start q-col-gutter-md">
        <div class="col-auto">
          <!-- CAMBIO AQUÍ: Reemplazar el emoji por q-img -->
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
          <div class="row justify-between items-start">
            <div>
              <q-chip size="sm" color="green-10" text-color="yellow-1" icon="person">
              {{ planta.nombre }}
            </q-chip>
             
            </div>
          </div>
          
          <div class="text-body2 text-grey-9 q-mt-sm q-mb-sm">{{ planta.biografia }}</div>
          
          <div class="q-mt-md">
            <q-chip size="sm" color="green-10" text-color="yellow-10" icon="electric_bolt">
              {{ planta.tipo }}
            </q-chip>
             <q-chip size="sm" color="green-10" text-color="yellow-1" icon="calendar_month">
              {{ planta.edad }}
            </q-chip>
            <q-chip size="sm" color="yellow-2" text-color="grey-8" icon="wb_sunny">
              {{ planta.luz }}
            </q-chip>
            <q-chip size="sm" color="blue-2" text-color="grey-8" icon="water_drop">
              {{ planta.agua }}
            </q-chip>
            <q-chip size="sm" color="grey-3" text-color="grey-8" icon="thermostat">
              {{ planta.temperatura }}
            </q-chip>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  planta: { type: Object, required: true }
});
defineEmits(['click']);
</script>

<style scoped>
.tarjeta-hover {
  transition: all 0.3s ease;
}
.tarjeta-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Estilo adicional para la imagen */
.plant-avatar {
  border-radius: 50%;
  object-fit: cover;
  min-width: 60px;
  min-height: 60px;
}
</style>