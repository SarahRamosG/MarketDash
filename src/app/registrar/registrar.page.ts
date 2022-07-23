import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
 } from '@angular/forms';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  formularioRegistro: FormGroup;


  constructor(
    public modalCtrl:ModalController,public fb: FormBuilder,
    public alertController: AlertController , public ToastController: ToastController) { 
    this.formularioRegistro = this.fb.group({
      'nombrecompleto': new FormControl ("", Validators.required),
     'nombre': new FormControl ("", Validators.required),
      'contrasena': new FormControl ("", Validators.required),
      'confirmacioncontrasena': new FormControl ("", Validators.required),

        });

}

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert= await this.alertController.create({
        message:'Favor llenar todos los datos.',
        buttons:['Aceptar']
      });
      await alert.present();
      return;
    }
    
    var usuario = {
      nombrecompleto: f.nombrecompleto,
      nombre: f.nombre,
      contrasena: f.contrasena,
      confirmarcontrasena: f.confirmacioncontrasena,
    }

  ////Con este metodo se trata de comparar los campos de contrasena y mostrar
  //alerta si no son iguales los datos. P
    var firstpassword =  usuario.contrasena;
    var secondpassword = usuario.confirmarcontrasena;

    if((firstpassword  && secondpassword) && (firstpassword != secondpassword)){
      const alert= await this.alertController.create({
        message:'Las contraseñas no coinciden',
        buttons:['Aceptar']
      });
      await alert.present();
      return;
    }

    //guardarlo de forma local en nuestro navegador
    localStorage.setItem('usuario', JSON.stringify(usuario));

    //mensaje de que se ha registrado correctament
    const toast = await  this.ToastController.create({
      message: 'Se ha registrado correctamente.',
      duration: 2000
    });

    toast.present();
    
    
     
  }



}
