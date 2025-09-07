import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware para manejar el tema desde cookies y evitar flash blanco
 * Lee la preferencia del tema desde las cookies y la establece en headers
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Leer el tema desde las cookies
  const themeCookie = request.cookies.get('theme')?.value || 'system';
  
  // Determinar el tema actual basado en la preferencia
  let actualTheme: string;
  
  if (themeCookie === 'system') {
    // Para el tema system, usar dark como fallback en el servidor
    // El cliente puede ajustarlo después basado en prefers-color-scheme
    actualTheme = 'dark';
  } else {
    actualTheme = themeCookie;
  }
  
  // Establecer headers para que el servidor conozca el tema
  response.headers.set('x-theme', actualTheme);
  response.headers.set('x-theme-preference', themeCookie);
  
  return response;
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas excepto:
     * - api (API routes)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};