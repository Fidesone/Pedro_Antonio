export function getPrerenderParams(route: string): string[] {
  return []; // Angular no debe prerenderizar rutas dinámicas
}

export function getPrerenderRoutes(): string[] {
  return [
    '/', '/register', '/login',
    '/articulos', '/libros',
    '/biografia', '/nuevo-articulo',
    '/nuevo-libro'
  ];
}
export const prerenderOptions = {
  discoverRoutes: false
};
