const CLAVE_ALMACENAMIENTO = 'plantmatch-perfiles';

export const TIPOS_PLANTA = [
  'Begonia', 'Cactus', 'Pothos', 'Helecho', 'Suculenta', 'Monstera',
  'Orquídea', 'Lavanda', 'Aloe Vera', 'Bambú', 'Tomate', 'Menta',
  'Rosa', 'Girasol', 'Lirio', 'Hiedra', 'Jazmín', 'Calamondín'
];

const perfilesPorDefecto = [
  {
    id: 1,
    nombre: 'Bella la Begonia',
    tipo: 'Begonia',
    edad: '2 años',
    luz: 'Sombra parcial',
    agua: 'Moderada',
    temperatura: '18-24°C',
    biografia: '¡Hola! Soy una begonia coqueta que ama la humedad y las conversaciones profundas.',
    imagen: 'https://s1.ppllstatics.com/mujerhoy/www/multimedia/202503/11/media/cortadas/begonia-flores-k3sE-U2301109499365qgB-1248x1248@MujerHoy.jpg',
    compatibilidad: ['Helecho', 'Pothos', 'Calathea']
  },
  {
    id: 2,
    nombre: 'Carlos el Cactus',
    tipo: 'Cactus', 
    edad: '5 años',
    luz: 'Sol directo',
    agua: 'Baja',
    temperatura: '20-30°C',
    biografia: 'Soy un cactus independiente y resistente. Me gusta el sol y no necesito mucha atención.',
    imagen: 'https://cdn0.ecologiaverde.com/es/posts/7/0/9/consejos_para_ayudar_a_los_cactus_a_florecer_907_600_square.jpg',
    compatibilidad: ['Suculenta', 'Aloe Vera', 'Echeveria']
  }
];

export const obtenerPerfilesPlantas = () => {
  const almacenado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (almacenado) return JSON.parse(almacenado);
  
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(perfilesPorDefecto));
  return perfilesPorDefecto;
};

export const crearPerfilPlanta = (perfil) => {
  const perfiles = obtenerPerfilesPlantas();
  const nuevoPerfil = {
    id: Date.now(),
    nombre: perfil.nombre,
    tipo: perfil.tipo,
    edad: perfil.edad || '1 año', 
    luz: perfil.luz,
    agua: perfil.agua,
    temperatura: perfil.temperatura,
    biografia: perfil.biografia,
    imagen: perfil.imagen,
    compatibilidad: []
  };
  
  perfiles.push(nuevoPerfil);
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(perfiles));
  return nuevoPerfil;
};