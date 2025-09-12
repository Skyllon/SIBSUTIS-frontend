import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductItem } from './product-item.interface';

@Component({
  selector: 'app-shopping-list',
  templateUrl: '../index.html'
})

export class ShoppingItemComponent {
  @Input() item!: ProductItem
  @Output() onPurchased = new EventEmitter<number>()

  clickOnPurchased() {
    this.onPurchased.emit(this.item.id)
  }
}
