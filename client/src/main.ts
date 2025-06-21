import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import routeConfig from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi())
  ],
}).catch((err) => console.error(err));
