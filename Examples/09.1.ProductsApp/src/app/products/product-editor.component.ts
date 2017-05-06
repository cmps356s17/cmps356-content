import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'product-editor',
  templateUrl: 'app/products/product-editor.component.html'
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Editor';
  mode : string;
  product : IProduct;
  errorMessage: string;

  private sub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
        params => {
          console.log("Params", params);

          //If id parameter is passed in the route
          if (params['id']) {
            this.mode = "Update";
            let id = +params['id'];
            this.getProduct(id);

          } else {
              this.mode = "Add";
           this.product = {
              productId: 0,
              productName: 'Test',
              productCode: '123',
              releaseDate: '',
              price: 10,
              description: '',
              starRating: 0,
              imageUrl: ''
            };
          }
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
      this.mode;
      this.product.productId;
      console.log(this.product);
  }

  getProduct(id: number) {
    this.productService.getProduct(id).then(product => {
      this.product = product;
      console.log("product", product);
    }).catch(err => {
      this.errorMessage = err;
    });
  }
}