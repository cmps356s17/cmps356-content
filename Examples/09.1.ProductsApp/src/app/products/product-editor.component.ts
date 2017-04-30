import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'product-editor',
  template: `
    <form (ngSubmit)="onSubmit()" #productForm="ngForm">
      <div>ProductId:   <input type="text" name="productId"     [(ngModel)]="product.productId"   required></div>
      <div>Name:        <input type="text" name="productName"   [(ngModel)]="product.productName" required></div>
      <div>Price:       <input type="text" name="price"         [(ngModel)]="product.price"       required></div>
      <div>Description: <input type="text" name="description"   [(ngModel)]="product.description" required></div>
      <button type="submit">Submit</button>
    </form>
  `
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  product : IProduct = {
    productId: 0,
    productName: 'Test',
    productCode: '123',
    releaseDate: '',
    price: 10,
    description: '',
    starRating: 0,
    imageUrl: ''
  };
  errorMessage: string;

  private sub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
/*    this.sub = this.route.params.subscribe(
        params => {
          console.log("Params", params);
          if (params == {}) {
            return;
          }
          let id = +params['id'];
          this.getProduct(id);
        });*/
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.product);
  }

  getProduct(id: number) {
    this.productService.getProduct(id).then(product => {
      this.product = product;
    }).catch(err => {
      this.errorMessage = err;
    });
  }
}