import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyAnHnLcDCN0O6ySYym6CLAq8gkSjYNglr8';

// Inicializa el cliente de Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const sendMessageToGemini = async (myPlant, selectedPlant, message) => {
  try {
    // Usa el modelo gemini-pro
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Eres ${selectedPlant.name}, una planta ${selectedPlant.type}. Tu personalidad es: ${selectedPlant.bio}. 
    Estás chateando con ${myPlant.name}, una ${myPlant.type}.
    
    Responde de manera breve, amigable y con la personalidad de tu tipo de planta. Usa emojis ocasionalmente.
    Menciona tus necesidades de luz (${selectedPlant.light}), agua (${selectedPlant.water}) y temperatura (${selectedPlant.temperature}) de forma natural en la conversación.
    
    Mensaje recibido: "${message}"
    
    Responde como ${selectedPlant.name} en primera persona, de forma casual y coqueta si es apropiado.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error al comunicarse con Gemini:', error);
    throw new Error('No pude procesar la solicitud. Intenta de nuevo.');
  }
};

export const getAdviceFromGemini = async (myPlant, selectedPlant) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Dame consejos divertidos y creativos para una "primera cita en el vivero" entre:
    
    Planta 1: ${myPlant.name} (${myPlant.type})
    - Luz: ${myPlant.light}
    - Agua: ${myPlant.water}
    - Temperatura: ${myPlant.temperature}
    - Bio: ${myPlant.bio}
    
    Planta 2: ${selectedPlant.name} (${selectedPlant.type})
    - Luz: ${selectedPlant.light}
    - Agua: ${selectedPlant.water}
    - Temperatura: ${selectedPlant.temperature}
    - Bio: ${selectedPlant.bio}
    
    Incluye:
    1. El lugar ideal en el vivero para la cita
    2. Temas de conversación recomendados
    3. Qué hacer y qué evitar
    4. Un tip especial basado en su compatibilidad
    
    Sé creativo, divertido y mantén el tono romántico pero profesional sobre plantas.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error al obtener consejos de Gemini:', error);
    throw new Error('No pude generar consejos. Intenta de nuevo.');
  }
};

