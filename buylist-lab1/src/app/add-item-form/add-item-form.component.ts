import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItem } from '../models/product-item.model';

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

  onSubmit() {
    if (this.name.trim()) {
      this.itemAdded.emit({
        name: this.name.trim(),
        quantity: this.quantity,
        purchased: false
      });

      // Сброс формы
      this.name = '';
      this.quantity = 1;
    }
  }
}
