export const checkCompatibility = (myPlant, otherPlant) => {
  let score = 0;
  
  if (myPlant.compatibility.includes(otherPlant.type)) {
    score += 40;
  }
  
  const lightCompatibility = {
    'Sol directo': ['Sol directo', 'Luz indirecta brillante'],
    'Luz indirecta': ['Luz indirecta', 'Luz indirecta brillante', 'Sombra parcial'],
    'Luz indirecta brillante': ['Luz indirecta', 'Luz indirecta brillante', 'Sol directo'],
    'Sombra parcial': ['Sombra', 'Sombra parcial', 'Luz indirecta'],
    'Sombra': ['Sombra', 'Sombra parcial']
  };
  
  if (lightCompatibility[myPlant.light]?.includes(otherPlant.light)) {
    score += 30;
  }
  
  const waterLevels = ['Muy baja', 'Baja', 'Moderada', 'Alta'];
  const myWaterIndex = waterLevels.indexOf(myPlant.water);
  const plantWaterIndex = waterLevels.indexOf(otherPlant.water);
  const waterDiff = Math.abs(myWaterIndex - plantWaterIndex);
  score += Math.max(0, 30 - (waterDiff * 10));
  
  return Math.min(100, score);
};