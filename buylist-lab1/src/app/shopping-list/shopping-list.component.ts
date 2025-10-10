import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../models/product-item.model';
import { ShoppingItemComponent } from '../shopping-item/shopping-item.component';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingItemComponent, AddItemFormComponent],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: ProductItem[] = [];
  filter: 'all' | 'purchased' | 'notPurchased' = 'all';

  ngOnInit() {
    this.loadItemsFromStorage();
  }

  addItem(newItem: Omit<ProductItem, 'id'>) {
    const item: ProductItem = {
      ...newItem,
      id: Date.now()
    };
    this.items.push(item);
    this.saveItemsToStorage();
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItemsToStorage();
  }

  togglePurchased(id: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.purchased = !item.purchased;
      this.saveItemsToStorage();
    }
  }

  get filteredItems(): ProductItem[] {
    switch (this.filter) {
      case 'purchased':
        return this.items.filter(item => item.purchased);
      case 'notPurchased':
        return this.items.filter(item => !item.purchased);
      default:
        return this.items;
    }
  }

  private saveItemsToStorage() {
    localStorage.setItem('shoppingItems', JSON.stringify(this.items));
  }

  private loadItemsFromStorage() {
    const stored = localStorage.getItem('shoppingItems');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }

  setFilter(filter: 'all' | 'purchased' | 'notPurchased') {
    this.filter = filter;
  }
}
