import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController,ToastController} from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
 } from '@angular/forms';
import { FolderPage } from '../folder/folder.page';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;



  constructor(
    public fb: FormBuilder, 
    public alertController: AlertController,
    public modalCtrl:ModalController,
    public ToastController: ToastController,
    private router: Router
  ) { 
         this.formularioLogin = this.fb.group({
          'nombre': new FormControl ("", Validators.required),
           'contrasena': new FormControl ("", Validators.required),   
             });
  
  }

  ngOnInit() {

    
  }


  async ingresar(){
    var f = this.formularioLogin.value;
   
    var usuario = JSON.parse(localStorage.getItem('usuario'));

    //compara que los datos de registrar sean los mismos que se ingresen en los campos de login
    if (usuario.nombre == f.nombre && usuario.contrasena== f.contrasena){
      //dirigirse a la pantalla del menu
      this.router.navigate(['./supermercados']);

    }else{
      const alert = await this.alertController.create({
        message:'Los datos que ingreso son incorrectos.',
        buttons:['Aceptar']
      });
      await alert.present();
      return;
    }
  }

}
