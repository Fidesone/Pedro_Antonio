export function getPrerenderParams(route: string): string[] {
  // no prerenderizamos rutas con parámetros como ':id'
  return [];
}