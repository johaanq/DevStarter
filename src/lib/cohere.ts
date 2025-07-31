export async function generateAbsurdIdeaWithCohere(): Promise<string> {
    try {
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command",
          prompt: `Genera una idea absurda de aplicación web/móvil que ningún programador debería hacer, pero que igual haría para practicar. Debe ser divertida, técnicamente posible pero inútil, y específica. Responde solo con la idea en una oración:
  
  Ejemplos:
  - Una app que convierte tus errores de JavaScript en poemas de desamor
  - Un bot que te manda notificaciones cada vez que alguien usa jQuery en 2024
  
  Idea absurda:`,
          max_tokens: 100,
          temperature: 0.9,
        }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      const idea = data.generations[0]?.text?.trim()
  
      if (!idea) {
        throw new Error("Cohere no devolvió ninguna idea")
      }
  
      return idea
    } catch (error: any) {
      console.error("Error generando idea con Cohere:", error)
      throw new Error(`Error de Cohere: ${error.message}`)
    }
  }
  