import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { BasedatosService } from '../services/basedatos.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import {StripeComponent} from '../stripe/stripe.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  formularioRegistro: FormGroup;
  datosCliente: any;
  unsafePhoto = '';
  photo = 'https://i.pravatar.cc/150';
  clientData: any = {};


  constructor(public dataservice: BasedatosService,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public alertController: AlertController,
    public ToastController: ToastController,
    private router: Router,
    private domSanitizer: DomSanitizer

    ) {
  }

  ngOnInit() {
  
      this.dataservice.getDocument('clientes').subscribe(clientData => {
        this.clientData = clientData[0];
        this.formularioRegistro.setValue({
          nombre: this.clientData.nombre,
          contrasena: this.clientData.contrasena,
          email: this.clientData.email,
          tarjeta: this.clientData.tarjeta
        });
      });
     

    

    //mostrar document de clientes en la pantalla

    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tarjeta: ['', [Validators.required]],
    });
  }

  get nombre() {
    return this.formularioRegistro.get('nombre');
  }

  get contrasena() {
    return this.formularioRegistro.get('contrasena');
  }

  get email() {
    return this.formularioRegistro.get('email');
  }

 

  async guardar() {
    //guardar informacion en la base de datos firebase
    console.log('ESTO VAMOS A GUARDAR=>', this.formularioRegistro.value);
    const data = this.formularioRegistro.value;
    data.photo = this.unsafePhoto;
    //me crea la tabla clientes, pero no se si la suplica al ya estar creada
    this.dataservice.editClient(data);

    //mensaje de que se ha registrado correctament

    const toast = await this.ToastController.create({
      message: 'Se ha actualizado correctamente.',
      duration: 2000

    });

    toast.present();
  }

  async openOptionSelection() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.unsafePhoto = image.webPath;
    this.photo = this.domSanitizer.bypassSecurityTrustUrl(image.webPath) as string;
  }
}