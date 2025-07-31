import { NextResponse } from "next/server"
import Groq from "groq-sdk"

export async function GET() {
  try {
    // Verificar que la API key existe
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: "GROQ_API_KEY no está configurada",
          connected: false,
        },
        { status: 500 },
      )
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    // Hacer una llamada simple para verificar conexión
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: "Responde solo con 'OK' si puedes leerme",
        },
      ],
      max_tokens: 5,
    })

    const response = completion.choices[0]?.message?.content

    return NextResponse.json({
      connected: true,
      response: response,
      model: "llama3-8b-8192",
      usage: completion.usage,
    })
  } catch (error: any) {
    console.error("Error testing Groq:", error)

    return NextResponse.json(
      {
        connected: false,
        error: error.message,
        type: error.type || "unknown_error",
      },
      { status: 500 },
    )
  }
}
