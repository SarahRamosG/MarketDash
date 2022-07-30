import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
 } from '@angular/forms';
import { clientes } from '../models/interfaces';
import { BasedatosService } from '../services/basedatos.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  formularioRegistro:FormGroup;
  public clientes:any;

  constructor( public dataservice: BasedatosService,
    public modalCtrl:ModalController,public fb: FormBuilder,
    public alertController: AlertController , public ToastController: ToastController) {
      this.inicializar();
     }


     inicializar(){
      this.dataservice.getDocument("clientes").subscribe(data=> this.clientes.push(...data));
   
     }
  ngOnInit() {

  }

  get nombre(){
    return this.formularioRegistro.get('nombre');
  }

  get contrasena(){
    return this.formularioRegistro.get('contrasena');
  }

  get email(){
    return this.formularioRegistro.get('email');
  }

  get tarjeta(){
    return this.formularioRegistro.get('tarjeta');
  }

  async guardar(){
    //guardar informacion en la base de datos firebase
    console.log('ESTO VAMOS A GUARDAR=>',this.formularioRegistro.value);
    const data = this.formularioRegistro.value;
    //me crea la tabla clientes, pero no se si la suplica al ya estar creada
    const enlace = 'clientes';
    this.dataservice.crearDocument(data,enlace);
 
  //mensaje de que se ha registrado correctament
 
  const toast = await this.ToastController.create({
    message: 'Se ha registrado correctamente.',
    duration: 2000
    
  });

  toast.present();
  }

}
