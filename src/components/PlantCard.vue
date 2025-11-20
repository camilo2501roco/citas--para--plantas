<template>
  <q-card 
    class="cursor-pointer transition-all hover-card" 
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
</template>

<script setup>
defineProps({
  plant: {
    type: Object,
    required: true
  }
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