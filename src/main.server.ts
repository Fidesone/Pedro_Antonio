import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// ⬅️ ✅ Exportar las funciones de prerender
export { getPrerenderParams, getPrerenderRoutes, prerenderOptions } from './app/prerender.config';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
