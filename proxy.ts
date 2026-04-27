import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth_token')?.value

  // 1. EXCLUSIONES: No tocar archivos estáticos, imágenes ni rutas internas
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. CASO: USUARIO NO AUTENTICADO
  if (!token) {
    // Si intenta entrar al dashboard, lo mandamos a la landing (/)
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // Si está en la landing o login, lo dejamos pasar (Next)
    return NextResponse.next()
  }

  // 3. CASO: USUARIO AUTENTICADO (Tiene Token)
  if (token) {
    // Si intenta ir a la landing (/) o al login, lo mandamos al dashboard
    if (pathname === '/' || pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// 4. EL MATCHER (Filtro quirúrgico)
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - api (rutas internas de Next)
     * - _next/static y _next/image (archivos del framework)
     * - favicon.ico y archivos con extensión (png, svg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}