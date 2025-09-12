import { Component, Output, EventEmitter } from '@angular/core';
import { ProductItem } from './product-item.interface';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: '../index.html'
})

export class AddItemFormComponent {
  @Output() itemAdd = new EventEmitter<Omit<ProductItem, 'id'>>()

  cost: number  = 0
  count: number = 0
  name: string = ''

  onConfirm(): void {
    if (this.name.trim()) {
      this.itemAdd.emit({
        itemCost: this.cost,
        itemCount: this.count,
        itemName: this.name.trim(),
        isItemPurchased: false
      })
    }

    this.cost  = 0
    this.count = 0
    this.name  = ''
  }
}
