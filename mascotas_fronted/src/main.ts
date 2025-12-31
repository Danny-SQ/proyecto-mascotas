import { enableProdMode } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline, callOutline, locationOutline, briefcaseOutline, notificationsOutline, home, listOutline, calendarOutline, personCircleOutline, pawOutline, leafOutline, maleFemaleOutline, transgenderOutline, scaleOutline, eyeOutline, createOutline, addOutline, trashOutline, logOutOutline, close, mailUnreadOutline} from 'ionicons/icons';

if (environment.production) {
  enableProdMode();
}

import { provideHttpClient } from '@angular/common/http';

addIcons({ mailOutline, lockClosedOutline, personOutline, callOutline, locationOutline, briefcaseOutline, notificationsOutline, home, listOutline, calendarOutline, personCircleOutline, pawOutline, leafOutline, maleFemaleOutline, transgenderOutline, scaleOutline, eyeOutline, createOutline, addOutline, trashOutline, logOutOutline, close, mailUnreadOutline});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), // ← AGREGADO withHashLocation()
    provideHttpClient()
  ],
});
