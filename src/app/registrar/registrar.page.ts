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
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  formularioRegistro: FormGroup;
    newclientes : clientes ={
    nombre:'',
    email: '',
    contrasena:'',
    confirmarcontrasena:'',

   };

  /*constructor(
    public database: BasedatosService,
    public modalCtrl:ModalController,public fb: FormBuilder,
    public alertController: AlertController , public ToastController: ToastController) { 
    this.formularioRegistro = this.fb.group({
     'nombre': new FormControl ("", Validators.required),
      'contrasena': new FormControl ("", Validators.required),
      'confirmacioncontrasena': new FormControl ("", Validators.required),
      'email': new FormControl ("", Validators.required),

        });

}
*/

constructor(public database: BasedatosService){}

  ngOnInit() {
  }

  guardar(){
    //guardar informacion en la base de datos firebase
    console.log('ESTO VAMOS A GUARDAR=>',this.newclientes);
    const data = this.newclientes;
    //me crea la tabla clientes, pero no se si la suplica al ya estar creada
    const enlace = 'clientes';
    this.database.crearDocument<clientes>(data,enlace);
  }
  //mensaje de que se ha registrado correctament
 
  /*const toast = await  this.ToastController.create({
    message: 'Se ha registrado correctamente.',
    duration: 2000
    
  });

  toast.present();
  }





  /*
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
    
    /*var usuario = {
      nombre: f.nombre,
      contrasena: f.contrasena,
      confirmarcontrasena: f.confirmacioncontrasena,
      email:f.email,
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
    }*/

    //guardarlo de forma local en nuestro navegador
    //localStorage.setItem('usuario', JSON.stringify(usuario));



    /*guardar informacion en la base de datos firebase
      console.log('ESTO VAMOS A GUARDAR=>',this.clientes);
      const data = this.clientes;
      //me crea la tabla clientes, pero no se si la suplica al ya estar creada
      const enlace = 'clientes';
      this.database.crearDocument<clientes>(data,enlace);

    //mensaje de que se ha registrado correctament
   
    const toast = await  this.ToastController.create({
      message: 'Se ha registrado correctamente.',
      duration: 2000
      
    });

    toast.present();
  }
    
    */
    
     
  



}
