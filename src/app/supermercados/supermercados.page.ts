import { Component, OnInit } from '@angular/core';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.page.html',
  styleUrls: ['./supermercados.page.scss'],
})
export class SupermercadosPage implements OnInit {
  

  
  /*
 name_supermercado = {
  supermarkert:{
    name:String;
  },

  supermarkert1:{
    name:'Bravo',
  },

  supermarkert2:{
    name:'Jumbo',
  },

  supermarkert3:{
    name:'Ole',
  },

 };
/*
   this.name_supermercado = [
 'Ole',
  'La Sirena',
  'Bravo',
 'Jumbo',
    ]
 */

 //data = Object.values(this.name_supermercado);
   name_supermercado: string [];
  searchsupermarker: any;

  constructor() { 
    this.inicializar();
  }
  

  inicializar(){
    this.name_supermercado = [
      'Ole',
       'La Sirena',
       'Bravo',
      'Jumbo',
    ]
  }

   //Metodo de buscar
   buscar(ev:any){

    this.inicializar();

    const val = ev.target.value;

    if (val && val.trim()!==''){
      this.name_supermercado = this.name_supermercado.filter ((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase())> - 1);
      });
    }
  }

  ngOnInit() {
  }

}
 


