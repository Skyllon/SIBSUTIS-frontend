import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItem } from '../models/product-item.model';
import { ShoppingItemComponent } from '../shopping-item/shopping-item.component';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingItemComponent, AddItemFormComponent, FormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: ProductItem[] = [];
  filteredItems: ProductItem[] = [];
  filter: 'all' | 'purchased' | 'notPurchased' = 'all';
  searchTerm: string = '';
  sortBy: 'name' | 'status' | 'category' = 'name';
  stats = { total: 0, purchased: 0, notPurchased: 0 };

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = this.shoppingService.getItems();
    this.applyFilters();
    this.updateStats();
  }

  addItem(newItem: Omit<ProductItem, 'id'>) {
    this.shoppingService.addItem(newItem);
    this.loadItems();
  }

  removeItem(id: number) {
    this.shoppingService.removeItem(id);
    this.loadItems();
  }

  editItem(updatedItem: ProductItem) {
    this.shoppingService.updateItem(updatedItem);
    this.loadItems();
  }

  togglePurchased(id: number) {
    this.shoppingService.togglePurchased(id);
    this.loadItems();
  }

  setFilter(filter: 'all' | 'purchased' | 'notPurchased') {
    this.filter = filter;
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  private applyFilters() {
    let result = this.items;

    if (this.searchTerm) {
      result = this.shoppingService.searchItems(this.searchTerm);
    }

    switch (this.filter) {
      case 'purchased':
        result = result.filter(item => item.purchased);
        break;
      case 'notPurchased':
        result = result.filter(item => !item.purchased);
        break;
    }

    this.filteredItems = this.shoppingService.sortItems(result, this.sortBy);
  }

  private updateStats() {
    this.stats = this.shoppingService.getStats();
  }
}
