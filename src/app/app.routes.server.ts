export function getPrerenderRoutes(): string[] {
  return [
    '/',
    '/register',
    '/login',
    '/articulos',
    '/libros',
    '/biografia',
    '/nuevo-articulo',
    '/nuevo-libro'
  ];
}

export function getPrerenderParams(route: string): string[] {
  return [];
}
