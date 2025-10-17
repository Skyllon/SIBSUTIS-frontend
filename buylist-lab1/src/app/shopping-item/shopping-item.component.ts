import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../models/product-item.model';

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent {
  @Input() item!: ProductItem;
  @Output() editItem = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() togglePurchased = new EventEmitter<number>();

  onRemove() {
    this.remove.emit(this.item.id);
  }

  onTogglePurchased() {
    this.togglePurchased.emit(this.item.id);
  }

  onToggleEdit() {
    this.editItem.emit(this.item.id);
  }
}
