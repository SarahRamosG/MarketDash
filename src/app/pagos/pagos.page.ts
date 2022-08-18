import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CartService, Products } from '../services/cart.service';
import { AppStoreService} from '../services/app-store.service';
import { CarritoPage } from '../carrito/carrito.page';
import {htmlToPdfmake} from 'html-to-pdfmake';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { BasedatosService } from '../services/basedatos.service';

declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
 
})
export class PagosPage implements OnInit {
   cart = [];
  isModalOpen = false;
  date : Date = new Date ();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  total : number;
  public factura1:any []= [];
  constructor(private router: Router, private cartServices: CartService, private factura : AppStoreService, private  dataservice: BasedatosService) { }

  ngOnInit() {

     // this.cart = this.factura.carrito;
      this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
      this.inicializar();

    }
    inicializar( ){
      this.dataservice.getDocument("factura").subscribe(data=> this.factura1 = data);
  
    }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  getTotal(){
    return this.cart.reduce((i,j)=> i + j.precio * j.initialValue, 0);
  }

}








