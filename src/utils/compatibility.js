const COMPATIBILIDAD_LUZ = {
  'Sol directo': ['Sol directo', 'Luz indirecta brillante'],
  'Luz indirecta': ['Luz indirecta', 'Luz indirecta brillante', 'Sombra parcial'],
  'Luz indirecta brillante': ['Luz indirecta', 'Luz indirecta brillante', 'Sol directo'],
  'Sombra parcial': ['Sombra', 'Sombra parcial', 'Luz indirecta'],
  'Sombra': ['Sombra', 'Sombra parcial']
};

const NIVELES_AGUA = ['Muy baja', 'Baja', 'Moderada', 'Alta', 'Muy alta'];

export const verificarCompatibilidad = (miPlanta, otraPlanta) => {
  let puntuacion = 0;
  
  // Compatibilidad por tipo (40 puntos)
  if (miPlanta.compatibilidad?.includes(otraPlanta.tipo)) {
    puntuacion += 40;
  }
  
  // Compatibilidad de luz (30 puntos)
  if (COMPATIBILIDAD_LUZ[miPlanta.luz]?.includes(otraPlanta.luz)) {
    puntuacion += 30;
  }
  
  // Compatibilidad de agua (30 puntos)
  const indiceMiAgua = NIVELES_AGUA.indexOf(miPlanta.agua);
  const indiceOtraAgua = NIVELES_AGUA.indexOf(otraPlanta.agua);
  const diferenciaAgua = Math.abs(indiceMiAgua - indiceOtraAgua);
  puntuacion += Math.max(0, 30 - (diferenciaAgua * 10));
  
  return Math.min(100, puntuacion);
};