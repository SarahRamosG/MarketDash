import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { FolderPage } from '../folder/folder.page';
import { Router } from '@angular/router';
import { clientes } from '../models/interfaces';
import { BasedatosService } from '../services/basedatos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';



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
    private FireStore: AngularFirestore,
    private FireAuth: AngularFireAuth,
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
    this.database
    .login(this.formularioLogin.value.email, this.formularioLogin.value.contrasena)
    .then(async ()=>{
      localStorage.setItem('cliente', this.formularioLogin.value.email);
      await loading.dismiss();
      this.router.navigate(['./supermercados']);

    })
    .catch(async () => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        message: 'Los datos que ingreso son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    });

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
