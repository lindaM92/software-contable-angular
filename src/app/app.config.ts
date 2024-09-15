import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

//Ajustando el codigo a la localización colombia (se necesita para que el pipe currency haga la separación de miles correctamente)
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO'; 


registerLocaleData(localeCo);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),//transicion para el cambio de pantalla
    //Importaciones para firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: LOCALE_ID, useValue: 'es-CO' } // Configurar localización a español (Colombia)

  ],
};
