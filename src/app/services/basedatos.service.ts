import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { clientes } from '../models/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
  clients: any;

  constructor(public FireStore: AngularFirestore,
    private FireAuth: AngularFireAuth)
   {
    this.clients = this.FireStore.collection("clientes");
   }

  //ingresar informacion a la base de datos.
  crearDocument(data: clientes, enlace: string) {
    //apunta hacia una collecion (tabla)
    const ref = this.FireStore.collection(enlace).add(data);
    //apunta hacia un doc (registro) que tenga el id que le enviaremos de argumento
  }

  getDocument(collecion: string) {
    return this.FireStore.collection(collecion).valueChanges();
  }

  authenticateClient(email: string, contrasena: string) {
    const client = this.clients.doc(email).valueChanges();
    return client.contrasena == contrasena;
  }

  getClient(email: string) {
    return this.clients.doc(email).valueChanges();
  }

  createClient(client: any) {
    return this.clients.doc(client.email).add(client);
  }

  editClient(client: any) {
    return this.clients.doc(client.email).update(client);
  }

  deleteClient(client: any) {
    return this.clients.doc(client.email).delete();
  }

  //Nos genera un ID aleatorio desde la BD
  createId() {
    return this.FireStore.createId();
  }

  login(email: string, password: string) {
    return this.FireAuth.signInWithEmailAndPassword(email, password);
  }
}

