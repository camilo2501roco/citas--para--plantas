import { GoogleGenerativeAI } from '@google/generative-ai';

// API Keys separadas para diferentes funciones
const GEMINI_API_KEY_CHAT = 'AIzaSyAnHnLcDCN0O6ySYym6CLAq8gkSjYNglr8';
const GEMINI_API_KEY_ADVICE = 'AIzaSyCTwUWBnsnnNIlMOuHJtq62EJwt-DLiBJc';

console.log('🔑 Inicializando Gemini APIs...');

// Instancias separadas para cada función
const genAIChat = new GoogleGenerativeAI(GEMINI_API_KEY_CHAT);
const genAIAdvice = new GoogleGenerativeAI(GEMINI_API_KEY_ADVICE);

// Test de conexión para ambas APIs
(async () => {
  try {
    console.log('🧪 Probando conexión con Gemini Chat...');
    const modelChat = genAIChat.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const resultChat = await modelChat.generateContent('Di solo "OK CHAT"');
    const responseChat = await resultChat.response;
    console.log('✅ Gemini Chat conectado:', responseChat.text());
  } catch (error) {
    console.error('❌ Error al conectar con Gemini Chat:', error.message);
  }

  try {
    console.log('🧪 Probando conexión con Gemini Advice...');
    const modelAdvice = genAIAdvice.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const resultAdvice = await modelAdvice.generateContent('Di solo "OK ADVICE"');
    const responseAdvice = await resultAdvice.response;
    console.log('✅ Gemini Advice conectado:', responseAdvice.text());
  } catch (error) {
    console.error('❌ Error al conectar con Gemini Advice:', error.message);
  }
})();

// Función de chat usa su propia API key
export const sendMessageToGemini = async (myPlant, selectedPlant, message) => {
  try {
    console.log('🌱 Enviando mensaje a Gemini CHAT...');
    
    const model = genAIChat.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Eres ${selectedPlant.name}, una planta ${selectedPlant.type}. Tu personalidad es: ${selectedPlant.bio}. 
    Estás chateando con ${myPlant.name}, una ${myPlant.type}.
    
    Responde de manera breve, amigable y con la personalidad de tu tipo de planta. Usa emojis ocasionalmente.
    Menciona tus necesidades de luz (${selectedPlant.light}), agua (${selectedPlant.water}) y temperatura (${selectedPlant.temperature}) de forma natural en la conversación.
    
    Mensaje recibido: "${message}"
    
    Responde como ${selectedPlant.name} en primera persona, de forma casual y coqueta si es apropiado.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Respuesta recibida del chat');
    return text;
  } catch (error) {
    console.error('❌ Error al comunicarse con Gemini CHAT:', error);
    console.error('Detalles:', error.message);
    throw new Error(`No pude procesar la solicitud: ${error.message}`);
  }
};

// Función de consejos usa su propia API key
export const getAdviceFromGemini = async (myPlant, selectedPlant) => {
  try {
    console.log('💡 Solicitando consejos a Gemini ADVICE...');
    console.log('Plantas:', myPlant.name, 'y', selectedPlant.name);
    
    const model = genAIAdvice.getGenerativeModel({ model: 'gemini-2.5-flash' });

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

    console.log('📤 Enviando solicitud de consejos...');
    const result = await model.generateContent(prompt);
    
    console.log('📥 Respuesta recibida');
    const response = await result.response;
    
    console.log('📝 Extrayendo texto...');
    const text = response.text();
    
    console.log('✅ Consejos generados exitosamente. Longitud:', text.length);
    console.log('Primeros 100 caracteres:', text.substring(0, 100));
    return text;
    
  } catch (error) {
    console.error('❌ Error al obtener consejos de Gemini ADVICE:');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);
    
    throw new Error(`No pude generar consejos: ${error.message}`);
  }
};