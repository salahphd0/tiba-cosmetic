import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AngularFireAuthModule,
  USE_DEVICE_LANGUAGE,
  PERSISTENCE,
} from '@angular/fire/auth';
import { UtilsModule } from './utils/utils.module';
import { LoggerComponent } from './components/logger.component';
@NgModule({
  declarations: [AppComponent, LoggerComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    UtilsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: PERSISTENCE, useValue: 'session' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
