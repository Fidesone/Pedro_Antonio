import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

// ✅ Esta función indica qué rutas estáticas prerenderizar
export function getPrerenderRoutes() {
  return [
    '/',
    '/register',
    '/login',
    '/articulos',
    '/libros',
    '/biografia',
    '/nuevo-articulo',
    '/nuevo-libro'
    // ⛔️ No incluyas rutas con ':id'
  ];
}
