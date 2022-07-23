import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegistrarPage } from '../registrar/registrar.page';


@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    ) { }

  ngOnInit() {
  }
  
}
