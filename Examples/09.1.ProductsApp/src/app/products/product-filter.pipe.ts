import {  PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(value, filterBy: string) {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter( product =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
