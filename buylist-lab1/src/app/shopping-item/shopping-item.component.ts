import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItem, Category } from '../models/product-item.model';

@Component({
  selector: 'app-shopping-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent {
  @Input() item!: ProductItem;
  @Output() editItem = new EventEmitter<ProductItem>();
  @Output() remove = new EventEmitter<number>();
  @Output() togglePurchased = new EventEmitter<number>();

  isEditing = false;
  editedItem: ProductItem = { ...this.item };
  categories = Object.values(Category);

  onRemove() {
    this.remove.emit(this.item.id);
  }

  onTogglePurchased() {
    this.togglePurchased.emit(this.item.id);
  }

  onToggleEdit() {
    this.isEditing ? this.saveEdit() : this.startEdit();
  }

  startEdit() {
    this.editedItem = { ...this.item };
    this.isEditing = true;
  }

  saveEdit() {
    this.editItem.emit(this.editedItem);
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedItem = { ...this.item };
  }
}
