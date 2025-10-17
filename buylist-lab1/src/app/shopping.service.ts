import { Injectable } from '@angular/core';
import { ProductItem, Category } from './models/product-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private readonly STORAGE_KEY = 'shoppingItems';

  constructor() { }

  getItems(): ProductItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveItems(items: ProductItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  addItem(item: Omit<ProductItem, 'id'>): ProductItem {
    const items = this.getItems();
    const newItem: ProductItem = {
      ...item,
      id: Date.now()
    };
    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  removeItem(id: number): void {
    const items = this.getItems().filter(item => item.id !== id);
    this.saveItems(items);
  }

  updateItem(updatedItem: ProductItem): void {
    const items = this.getItems().map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.saveItems(items);
  }

  togglePurchased(id: number): void {
    const items = this.getItems().map(item => {
      if (item.id === id) {
        return { ...item, purchased: !item.purchased };
      }
      return item;
    });
    this.saveItems(items);
  }

  getStats(): { total: number, purchased: number, notPurchased: number } {
    const items = this.getItems();
    return {
      total: items.length,
      purchased: items.filter(item => item.purchased).length,
      notPurchased: items.filter(item => !item.purchased).length
    };
  }

  searchItems(term: string): ProductItem[] {
    const items = this.getItems();
    if (!term.trim()) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  sortItems(items: ProductItem[], sortBy: 'name' | 'status' | 'category'): ProductItem[] {
    const sorted = [...items];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'status':
        return sorted.sort((a, b) => Number(a.purchased) - Number(b.purchased));
      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return sorted;
    }
  }
}
