import {  Component, OnInit,ElementRef, ViewChild, Input} from '@angular/core';
import { CartService, Products } from '../services/cart.service';
import { AppStoreService} from '../services/app-store.service';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { BasedatosService } from '../services/basedatos.service';
import { Routes, RouterModule, Router } from '@angular/router';
//import {pdfMake} from 'pdfmake/build/pdfmake';
//import {pdfFonts} from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {loadStripe, Stripe} from "@stripe/stripe-js";
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';



declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart = [];
  isModalOpen = false;
  date : Date = new Date ();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  private stripe : Stripe;
  private mensaje = "";
  carrito : CarritoPage;
  private monto : number;





  constructor(private cartServices: CartService, private modalCtrl: ModalController, private factura : AppStoreService, public ToastController: ToastController, public alertController: AlertController,
    public database: BasedatosService, private router: Router) { }

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  async ngOnInit() {

  
    this.cart = this.cartServices.getCart();
    this.factura.setcarrito(this.cart);
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

  }

  decreaseCartItem(product){
    this.cartServices.decreaseProduct(product);

  }

  increaseCartItem(product){
    this.cartServices.addProduct(product);

  }

  removeCartItem(product){
    this.cartServices.removeProduct(product);
  }

  getTotal(){
    return this.cart.reduce((i,j)=> i + j.precio * j.initialValue, 0);
  }

  close(){
    this.modalCtrl.dismiss();
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


async guardarfactura(){

 console.log('ESTO VAMOS A GUARDAR=>', this.cart);
  //me crea la tabla clientes, pero no se si la suplica al ya estar creada
  for await (const data of this.cart) {
    this.database.crearDocument(data,'factura');
  }


}
}
