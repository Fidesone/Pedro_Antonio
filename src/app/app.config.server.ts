// app.config.server.ts

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const config = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()]
});

// ✅ Lista de rutas estáticas que quieres prerenderizar
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

// 🚨 ESTA FUNCIÓN ES LO QUE SILENCIA EL ERROR
export function getPrerenderParams(route: string): string[] {
  return []; // no prerenderizamos rutas con :id
}
