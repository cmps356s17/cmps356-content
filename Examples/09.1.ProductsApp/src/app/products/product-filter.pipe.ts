import {  PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'productsFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(products: IProduct[], filterBy: string) {
        if (!filterBy) {
            return products
        }
        filterBy = filterBy.toLocaleLowerCase();
        let filteredProducts = products.filter(product =>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)

        return filteredProducts
    }
}
