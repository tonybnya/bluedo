import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import routeConfig from "./app/routes";
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log('Running in production mode');
  console.log('API URL:', environment.apiUrl);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi())
  ],
}).catch((err) => console.error(err));
