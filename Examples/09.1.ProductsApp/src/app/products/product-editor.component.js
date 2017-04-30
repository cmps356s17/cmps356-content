"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var product_service_1 = require("./product.service");
var ProductEditorComponent = (function () {
    function ProductEditorComponent(router, route, productService) {
        this.router = router;
        this.route = route;
        this.productService = productService;
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
    ProductEditorComponent.prototype.ngOnInit = function () {
        /*    this.sub = this.route.params.subscribe(
                params => {
                  console.log("Params", params);
                  if (params == {}) {
                    return;
                  }
                  let id = +params['id'];
                  this.getProduct(id);
                });*/
    };
    ProductEditorComponent.prototype.ngOnDestroy = function () {
        //this.sub.unsubscribe();
    };
    ProductEditorComponent.prototype.onSubmit = function () {
        console.log(this.product);
    };
    ProductEditorComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.productService.getProduct(id).then(function (product) {
            _this.product = product;
        }).catch(function (err) {
            _this.errorMessage = err;
        });
    };
    return ProductEditorComponent;
}());
ProductEditorComponent = __decorate([
    core_1.Component({
        selector: 'product-editor',
        template: "\n    <form (ngSubmit)=\"onSubmit()\" #productForm=\"ngForm\">\n      <div>ProductId:   <input type=\"text\" name=\"productId\"     [(ngModel)]=\"product.productId\"   required></div>\n      <div>Name:        <input type=\"text\" name=\"productName\"   [(ngModel)]=\"product.productName\" required></div>\n      <div>Price:       <input type=\"text\" name=\"price\"         [(ngModel)]=\"product.price\"       required></div>\n      <div>Description: <input type=\"text\" name=\"description\"   [(ngModel)]=\"product.description\" required></div>\n      <button type=\"submit\">Submit</button>\n    </form>\n  "
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute,
        product_service_1.ProductService])
], ProductEditorComponent);
exports.ProductEditorComponent = ProductEditorComponent;
//# sourceMappingURL=product-editor.component.js.map