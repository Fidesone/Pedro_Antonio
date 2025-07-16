console.log('🟢 app.routes.server.ts cargado');

export function getPrerenderRoutes(): string[] {
  console.log('✅ getPrerenderRoutes ejecutado');
  return [
    '/', '/register', '/login',
    '/articulos', '/libros',
    '/biografia', '/nuevo-articulo',
    '/nuevo-libro'
    // ⛔️ NO incluimos /modificar-libro/:id aquí
  ];
}

export function getPrerenderParams(route: string): string[] {
  console.log(`🔸 getPrerenderParams llamado con: ${route}`);
  return []; // ← Esto le dice a Angular: “nada que prerenderizar”
}

export const prerenderOptions = {
  discoverRoutes: false // ← No escanees rutas automáticamente
};
