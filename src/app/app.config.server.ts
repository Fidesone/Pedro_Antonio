import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, provideServerRouting } from '@angular/platform-server';
import { appConfig } from './app.config';

// ⚠️ Esta función le dice al compilador que NO genere rutas dinámicas
export function getPrerenderParams(route: string): string[] {
  return []; // nada para prerenderizar
}

// ✅ Rutas válidas para prerender
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
  ];
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting({
      getPrerenderRoutes,
      getPrerenderParams
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
