import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { clientes, factura } from '../models/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacturaPage } from '../factura/factura.page';


@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
  clients: any;
  clientList: [];
  factura: any;

  constructor(public FireStore: AngularFirestore,
    private FireAuth: AngularFireAuth)
   {
    this.clients = this.FireStore.collection("clientes");
    this.factura = this.FireStore.collection("factura");
   }

  //ingresar informacion a la base de datos.
  crearDocument(data: any, enlace: string) {
    //apunta hacia una collecion (tabla)
    const ref = this.FireStore.collection(enlace).add(data);
    //apunta hacia un doc (registro) que tenga el id que le enviaremos de argumento
  }

  crearfactura(data: factura, enlace:string){

    const ref = this.FireStore.collection(enlace).add(data);

  }

  getDocument(collecion: string) {
    return this.FireStore.collection(collecion).valueChanges();
  }

  getClient(client: any) {
    return this.clients.doc(client.email)?.get();
  }

  createClient(client: any) {
    return this.clients.add(client);
  }

  editClient(client: any) {
    return this.clients.doc('17PSOy4NIvXndVD21lc5')?.update(client);
  }

  deleteClient(client: any) {
    return this.clients.doc(client.email)?.delete();
  }

  //Nos genera un ID aleatorio desde la BD
  createId() {
    return this.FireStore.createId();
  }

  async login(email: string, password: string) {
    return this.FireAuth.signInWithEmailAndPassword(email,password);
  }
}

