import { Component, OnInit } from '@angular/core';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { BasedatosService } from '../services/basedatos.service';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.page.html',
  styleUrls: ['./supermercados.page.scss'],
})
export class SupermercadosPage implements OnInit {
  public superMarkets:any []= [];
  searchsupermarker: any;
  

  constructor(private  dataservice: BasedatosService) {
    this.inicializar();
  }


  inicializar( ){
    this.dataservice.getDocument("supermercados").subscribe(data=> this.superMarkets.push(...data));
   
  }

   //Metodo de buscar
   buscar(ev: any){

    this.inicializar();

    const val = ev.target.value;

   /*if (val && val.trim()!==''){
     // this.superMarkets = this.superMarkets.filter ((item) => (item.name.toLowerCase().indexOf(val.toLowerCase())> - 1));
    }*/
  }

  ngOnInit() {
  }

}

   
