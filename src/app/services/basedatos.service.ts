import { Injectable } from '@angular/core';
import {AngularFirestore,
AngularFirestoreDocument,
AngularFirestoreCollection} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class BasedatosService {


  constructor( public FireStore: AngularFirestore) { }

  //ingresar informacion a la base de datos.
  crearDocument <tipo>(data:tipo, enlace:string){
    //apunta hacia una collecion (tabla)
     const ref = this.FireStore.collection<tipo>(enlace);
     //apunta hacia un doc (registro) que tenga el id que le enviaremos de argumento
     return ref.add(data);
     
  }

  deleteDocument(){

  }

  editDocument(){

  }

  getDocument(){

  }


  //Nos genera un ID aleatorio desde la BD
  createId(){
   return  this.FireStore.createId();
  }
}
