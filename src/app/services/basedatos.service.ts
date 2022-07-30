import { Injectable } from '@angular/core';
import {AngularFirestore,
AngularFirestoreDocument,
AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { clientes } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class BasedatosService {


  constructor( public FireStore: AngularFirestore) { }

  //ingresar informacion a la base de datos.
  crearDocument(data : clientes,enlace:string){
    //apunta hacia una collecion (tabla)
     const ref = this.FireStore.collection(enlace).add(data);
     //apunta hacia un doc (registro) que tenga el id que le enviaremos de argumento
 
     
  }

  deleteDocument(){

  }

  editDocument(){

  }

 getDocument(collecion:string){

    return this.FireStore.collection(collecion).valueChanges();

  }


  //Nos genera un ID aleatorio desde la BD
  createId(){
   return  this.FireStore.createId();
  }
}
