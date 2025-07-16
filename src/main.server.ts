import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

import './app/app.routes.server';
console.log('🚀 main.server.ts ejecutado e importado app.routes.server.ts');

const bootstrap = () => {
  console.log('🚀 Lanzando bootstrap de AppComponent');
  return bootstrapApplication(AppComponent, config);
};

export default bootstrap;
