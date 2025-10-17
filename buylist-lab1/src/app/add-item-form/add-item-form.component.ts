import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItem, Category } from '../models/product-item.model';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent {
  @Output() itemAdded = new EventEmitter<Omit<ProductItem, 'id'>>();

  name = '';
  quantity = 1;
  note?: string = '';

  onSubmit() {
    if (this.name.trim()) {
      this.itemAdded.emit({
        name: this.name.trim(),
        quantity: this.quantity,
        purchased: false,
        category: Category.OTHER,
        note: this.note
      });

      this.name = '';
      this.note = '';
      this.quantity = 1;
    }
  }
}
