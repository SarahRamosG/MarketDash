import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { BasedatosService } from '../services/basedatos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, from, throwError } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  emailBD = [];
  user = {
    email: '',
    password: '',
  }

  constructor(
    public fb: FormBuilder,
    public database: BasedatosService,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public ToastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.formularioLogin = this.fb.group({
      email: ["", [Validators.required]],
      contrasena: ["", [Validators.required]],
    });

  }

  ngOnInit() {


  }

  async ingresar() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles'
    });

    await loading.present();
    //await this.database.login(this.formularioLogin.value.email, this.formularioLogin.value.contrasena)
    const result = this.database.authenticateClient(this.formularioLogin.value.email, this.formularioLogin.value.contrasena);
    console.log(result);
    if(result){
      loading.dismiss();
      this.router.navigate(['./supermercados']);
    }else{
      localStorage.setItem("client", this.formularioLogin.value.email);
      const alert = await this.alertController.create({
        message: 'Los datos que ingreso son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  /*var emailBD = this.database.getDocument('clientes');


  if (this.user.email ==  && this.user.password== emailBD.contrasena){
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
  */





  /*var f = this.formularioLogin.value;

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
*/
}
