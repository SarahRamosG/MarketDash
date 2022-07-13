import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupermercadosPageRoutingModule } from './supermercados-routing.module';

import { SupermercadosPage } from './supermercados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupermercadosPageRoutingModule
  ],
  declarations: [SupermercadosPage]
})
export class SupermercadosPageModule {}
