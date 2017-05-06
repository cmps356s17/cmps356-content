import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-guard.service';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import {ProductEditorComponent} from "./product-editor.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'prodeditor', component: ProductEditorComponent },
      { path: 'prodeditor/:id', component: ProductEditorComponent },
      { path: 'product/:id',  component: ProductDetailComponent }
    ]),
    FormsModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditorComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductDetailGuard
  ]
})
export class ProductModule {}
