import { GoogleGenerativeAI } from '@google/generative-ai';

const CLAVE_API_CHAT = 'AIzaSyB6fWV7yRHpNX8PAUQ0_m0_Jxq_2mjTt-o';
const CLAVE_API_CONSEJOS = 'AIzaSyCd-5CHLyndx0U5HlGyrvd7Qo_CHhyITAE';
const MODELO = 'gemini-2.5-flash';


if (!CLAVE_API_CHAT || !CLAVE_API_CONSEJOS) {
  console.error('Error: Las claves API no están definidas');
}

const iaChat = new GoogleGenerativeAI(CLAVE_API_CHAT);
const iaConsejos = new GoogleGenerativeAI(CLAVE_API_CONSEJOS);


const generarContenido = async (ia, prompt) => {
  try {
    const modelo = ia.getGenerativeModel({ model: MODELO });
    const resultado = await modelo.generateContent(prompt);
    const respuesta = await resultado.response;
    return respuesta.text();
  } catch (error) {
    console.error('Error en generarContenido:', error);
    throw error;
  }
};

export const enviarMensajeGemini = async (miPlanta, plantaSeleccionada, mensaje) => {
  try {
    const prompt = `Eres ${plantaSeleccionada.nombre}, una planta ${plantaSeleccionada.tipo}. Tu personalidad es: ${plantaSeleccionada.biografia}. 
    Estás chateando con ${miPlanta.nombre}, una ${miPlanta.tipo}.
    
    Responde de manera breve, amigable y con la personalidad de tu tipo de planta. Usa emojis ocasionalmente.
    Menciona tus necesidades de luz (${plantaSeleccionada.luz}), agua (${plantaSeleccionada.agua}) y temperatura (${plantaSeleccionada.temperatura}) de forma natural.
    
    Mensaje recibido: "${mensaje}"
    
    Responde como ${plantaSeleccionada.nombre} en primera persona, de forma casual y coqueta si es apropiado.`;

    return await generarContenido(iaChat, prompt);
  } catch (error) {
    console.error('Error al comunicarse con Gemini Chat:', error);
    throw new Error(`No pude procesar la solicitud: ${error.message}`);
  }
};

export const obtenerConsejosGemini = async (miPlanta, plantaSeleccionada) => {
  try {
    const prompt = `Dame consejos divertidos y creativos para una "primera cita en el vivero" entre:
    
    Planta 1: ${miPlanta.nombre} (${miPlanta.tipo})
    - Luz: ${miPlanta.luz} | Agua: ${miPlanta.agua} | Temperatura: ${miPlanta.temperatura}
    - Bio: ${miPlanta.biografia}
    
    Planta 2: ${plantaSeleccionada.nombre} (${plantaSeleccionada.tipo})
    - Luz: ${plantaSeleccionada.luz} | Agua: ${plantaSeleccionada.agua} | Temperatura: ${plantaSeleccionada.temperatura}
    - Bio: ${plantaSeleccionada.biografia}
    
    Incluye:
    1. El lugar ideal en el vivero para la cita
    2. Temas de conversación recomendados
    3. Qué hacer y qué evitar
    4. Un tip especial basado en su compatibilidad
    
    Sé creativo, divertido y mantén el tono romántico pero profesional sobre plantas.`;

    return await generarContenido(iaConsejos, prompt);
  } catch (error) {
    console.error('Error al obtener consejos de Gemini:', error);
    throw new Error(`No pude generar consejos: ${error.message}`);
  }
};