import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn:'root'})
export class AppStoreService{
    private readonly _factura = new BehaviorSubject<any>([]);

    readonly _factura$= this._factura.asObservable();
    get carrito(){
        return this._factura.getValue();
    }
    setcarrito(newValue:any){
        this._factura.next(newValue)

    }
    }
