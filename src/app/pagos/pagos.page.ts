import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CartService, Products } from '../services/cart.service';


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

  constructor(private router: Router, private cartServices: CartService) { }

  ngOnInit() {
      
      this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');


    }
  

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}








