import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { CarritoPageModule } from './carrito/carrito.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CarritoPageModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),AngularFirestoreModule,],
  providers: [BarcodeScanner,{provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})


export class AppModule {}
