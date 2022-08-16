import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { CarritoPage } from '../carrito/carrito.page';
import {htmlToPdfmake} from 'html-to-pdfmake';


declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {

  constructor() { privateCarritoPage : CarritoPage}

  ngOnInit() {
    // tratar de llamar lo que se presenta en la factura para ponerlo en el html y mostrarlo en el pdf

    //this.CarritoPage = this.cartServices.getCart();

  }

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 


}
}
