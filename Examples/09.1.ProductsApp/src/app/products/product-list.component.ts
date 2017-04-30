import { Component, OnInit }  from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Products';
    products: IProduct[];

    listFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;

    errorMessage: string;

    changeFilter() {
        this.listFilter = "Hammer"
    }

    constructor(private productService: ProductService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().then(products => {
            this.products = products;
        }).catch(err => {
            this.errorMessage = err;
        });
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
