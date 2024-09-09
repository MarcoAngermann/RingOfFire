import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-18f4d","appId":"1:867088836178:web:614c81ea7195288333618b","storageBucket":"ring-of-fire-18f4d.appspot.com","apiKey":"AIzaSyC0w7kt0dlwHLSWUQnWGlwWaW1-qkrbkWQ","authDomain":"ring-of-fire-18f4d.firebaseapp.com","messagingSenderId":"867088836178"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-18f4d","appId":"1:867088836178:web:614c81ea7195288333618b","storageBucket":"ring-of-fire-18f4d.appspot.com","apiKey":"AIzaSyC0w7kt0dlwHLSWUQnWGlwWaW1-qkrbkWQ","authDomain":"ring-of-fire-18f4d.firebaseapp.com","messagingSenderId":"867088836178"})), provideFirestore(() => getFirestore())]
};
