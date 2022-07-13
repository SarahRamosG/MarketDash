import { Component, OnInit } from '@angular/core';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {
  code: any;
  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }
     scan(){
      this.barcodeScanner.scan().then(barcodeData =>{
        this.code = barcodeData.text;
        console.log('Barcode data', this.code);
      }).catch(err=>{
        console.log('Error',err);
      });
      }

     }

