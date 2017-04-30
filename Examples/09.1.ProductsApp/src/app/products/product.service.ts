import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';

/*import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';*/

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor() { }

    getProducts() {
        return fetch(this.productUrl).then( (response : Response) => response.json() );
    }

    getProduct(id: number) {
        return this.getProducts().then( (products : any) => {
            return products.find( (p : IProduct) => p.productId === id);
        })
    }

/*    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }*/
}
