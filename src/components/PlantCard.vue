<template>
  <q-card class="cursor-pointer tarjeta-hover " bordered flat @click="$emit('click')">
    <q-card-section class="text-center">
      <div class="q-mb-md flex flex-center">
        
         
          <q-img 
            :src="planta.imagen" 
            :alt="planta.nombre"
            class="plant-avatar"
            width="80px"
            height="80px"
            style="border-radius: 50%;"
          />
        </div>
        
          
            <div>
              <q-chip size="sm" color="green-10" text-color="yellow-1" icon="person">
              {{ planta.nombre }}
            </q-chip>
             


             <div class="text-body2 text-grey-9 q-mt-sm q-mb-sm">{{ planta.biografia }}</div>
          
          
         
          
          <div  class="q-mt-md chips-container">
            <q-chip size="sm" color="brown-6" text-color="yellow-1" icon="electric_bolt">
              {{ planta.tipo }}
            </q-chip>
             <q-chip size="sm" color="brown-6" text-color="yellow-1" icon="calendar_month">
              {{ planta.edad }}
            </q-chip>
            <q-chip size="sm" color="brown-6" text-color="yellow-1" icon="wb_sunny">
              {{ planta.luz }}
            </q-chip>
            <q-chip size="sm" color="brown-6" text-color="yellow-1" icon="water_drop">
              {{ planta.agua }}
            </q-chip>
            <q-chip size="sm" color="brown-6" text-color="yellow-1" icon="thermostat">
              {{ planta.temperatura }}
            </q-chip>
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
 border-radius: 16px;
max-width: 320px;
width: 100%;
min-width: 280px;

}
.tarjeta-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}


.plant-avatar {
  border-radius: 50%;
  object-fit: cover;
  min-width: 60px;
  min-height: 60px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chips-container{
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;

 
}

 @media  (max-width :320px){
    .tarjeta-hover{
      min-width: 100%;
      padding: 8px;
    }
      .plant-avatar {
    min-width: 60px;
    min-height: 60px;
  }
  
  .chips-container :deep(.q-chip) {
    font-size: 0.7rem;
    padding: 2px 8px;
  }
    
  }
</style>