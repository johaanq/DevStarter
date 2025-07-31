import { NextResponse } from "next/server"
import { generateAbsurdIdea } from "@/lib/groq" // Aseguramos que solo importe de Groq

export async function POST() {
  try {
    const idea = await generateAbsurdIdea()

    return NextResponse.json({
      idea,
      source: "groq", // Fuente explícita: Groq
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error in generate-idea API:", error)

    return NextResponse.json(
      {
        error: error.message,
        source: "groq_error", // Error explícito de Groq
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
