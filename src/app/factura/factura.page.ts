import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { CarritoPage } from '../carrito/carrito.page';
import {htmlToPdfmake} from 'html-to-pdfmake';
import { AppStoreService} from '../services/app-store.service';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';

declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  cart = [];
  isModalOpen = false;
  date : Date = new Date ();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  total : number;


  constructor( private factura : AppStoreService) {}

  ngOnInit() {
   

    this.cart = this.factura.carrito;
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

  }

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 



}
setOpen(isOpen: boolean) {
  this.isModalOpen = isOpen;
}

getTotal(){
  return this.cart.reduce((i,j)=> i + j.precio * j.initialValue, 0);
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

}
