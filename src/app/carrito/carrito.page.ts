import {  Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Products } from '../services/cart.service';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import {pdfMake} from 'pdfmake/build/pdfmake';
//import {pdfFonts} from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

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
 


  constructor(private cartServices: CartService, private modalCtrl: ModalController) { }

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  ngOnInit() {

    this.cart = this.cartServices.getCart();
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

  createPdf(){
    
   /*const pdfDefinition: any = {
      content:[
        {
          text:'Hola'
          
          }
        ]
        
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();*/
  
  }

 
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    //pdfMake.createPdf(documentDefinition).download(); 
     const pdf = pdfMake.createPdf(documentDefinition);
      pdf.open();

}
}
