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
  user = {
    email:'',
    password:'',
  }


  constructor(
    public fb: FormBuilder, 
    public database: BasedatosService,
    public alertController: AlertController,
    public modalCtrl:ModalController,
    public ToastController: ToastController,
    private FireStore: AngularFirestore,
    private FireAuth:AngularFireAuth,
    private router: Router
  ) { 
         this.formularioLogin = this.fb.group({
          email: ["",[Validators.required]],
          contrasena: ["",[Validators.required]],  
             });
  
  }

  ngOnInit() {

    
  }


  async ingresar(){
    this.database.login(this.user.email,this.user.password).then (res=>{
      console.log(res);
      const alert = await this.alertController.create({
        message:'Los datos que ingreso son incorrectos.',
        buttons:['Aceptar']
      });
      
      
    })

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

}
