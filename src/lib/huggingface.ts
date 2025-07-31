export async function generateAbsurdIdeaWithHuggingFace(): Promise<string> {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: "Dame una idea absurda de app para programadores:",
          parameters: {
            max_length: 100,
            temperature: 0.9,
            do_sample: true,
          },
        }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      const idea = data[0]?.generated_text?.replace("Dame una idea absurda de app para programadores:", "").trim()
  
      if (!idea) {
        throw new Error("Hugging Face no devolvió ninguna idea")
      }
  
      return idea
    } catch (error: any) {
      console.error("Error generando idea con Hugging Face:", error)
      throw new Error(`Error de Hugging Face: ${error.message}`)
    }
  }
  