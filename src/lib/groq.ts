import Groq from "groq-sdk"

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY no está configurada en las variables de entorno")
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateAbsurdIdea(): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres un generador de ideas absurdas para aplicaciones web/móviles que ningún programador debería hacer, pero que igual haría para practicar o por diversión.

Las ideas deben ser:
- Técnicamente posibles pero completamente inútiles
- Divertidas y creativas
- Específicas (no genéricas)
- Que suenen como algo que un dev procrastinando haría
- En español
- Una sola oración

Ejemplos del tono:
- "Una app que convierte tus errores de JavaScript en poemas de desamor"
- "Un bot que te manda notificaciones cada vez que alguien usa jQuery en 2024"
- "Una calculadora que solo funciona si escribes los números cantando"
- "Un IDE que te insulta cada vez que usas var en lugar de let"
- "Una red social donde solo puedes postear si tu código compila sin warnings"

Responde SOLO con la idea, sin explicaciones adicionales.`,
        },
        {
          role: "user",
          content: "Dame una idea absurda de app para programadores procrastinadores",
        },
      ],
      model: "llama3-8b-8192", // Modelo gratuito y rápido
      max_tokens: 150,
      temperature: 0.9,
    })

    const idea = completion.choices[0]?.message?.content?.trim()

    if (!idea) {
      throw new Error("Groq no devolvió ninguna idea")
    }

    return idea
  } catch (error: any) {
    console.error("Error generando idea con Groq:", error)
    throw new Error(`Error de Groq: ${error.message}`)
  }
}

// Función para verificar la conexión con Groq
export async function testGroqConnection(): Promise<boolean> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Test" }],
      model: "llama3-8b-8192",
      max_tokens: 1,
    })

    return !!completion.choices[0]?.message?.content
  } catch (error) {
    console.error("Error testing Groq connection:", error)
    return false
  }
}
