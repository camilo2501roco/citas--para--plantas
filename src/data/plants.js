// data/plants.js
const STORAGE_KEY = 'plantmatch-profiles';

// Tipos de plantas predefinidos
export const PLANT_TYPES = [
  'Begonia', 'Cactus', 'Pothos', 'Helecho', 'Suculenta', 'Monstera',
  'Orquídea', 'Lavanda', 'Aloe Vera', 'Bambú', 'Tomate', 'Menta',
  'Rosa', 'Girasol', 'Lirio', 'Hiedra', 'Jazmín', 'Calamondín'
];

const defaultProfiles = [
  {
    id: 1,
    name: 'Bella la Begonia',
    type: 'Begonia',
    age: '2 años',
    light: 'Sombra parcial',
    water: 'Moderada',
    temperature: '18-24°C',
    bio: '¡Hola! Soy una begonia coqueta que ama la humedad y las conversaciones profundas.',
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
    bio: 'Soy un cactus independiente y resistente. Me gusta el sol y no necesito mucha atención.',
    image: '🌵',
    compatibility: ['Suculenta', 'Aloe Vera', 'Echeveria']
  }
];

export const getPlantProfiles = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfiles));
  return defaultProfiles;
};

export const createPlantProfile = (profile) => {
  const profiles = getPlantProfiles();
  const newProfile = {
    id: Date.now(),
    name: profile.name,
    type: profile.type,
    age: profile.age || '1 año', 
    light: profile.light,
    water: profile.water,
    temperature: profile.temperature,
    bio: profile.bio,
    image: profile.image,
    compatibility: []
  };
  
  profiles.push(newProfile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  return newProfile;
};