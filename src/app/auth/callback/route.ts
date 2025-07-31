import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  console.log("Auth callback: Starting callback process...")
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  
  console.log("Auth callback: Code received:", code ? "Yes" : "No")
  console.log("Auth callback: Redirecting to:", requestUrl.origin)

  if (code) {
    try {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      console.log("Auth callback: Exchanging code for session...")
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error("Auth callback: Error exchanging code:", error)
      } else {
        console.log("Auth callback: Session exchanged successfully:", data.session ? "Session exists" : "No session")
        if (data.session?.user) {
          console.log("Auth callback: User logged in:", data.session.user.email)
        }
      }
    } catch (error) {
      console.error("Auth callback: Unexpected error:", error)
    }
  }

  // Redirige al usuario de vuelta a la URL de origen (donde estaba antes de iniciar sesión)
  return NextResponse.redirect(requestUrl.origin)
}
