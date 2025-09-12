import { Component, OnInit } from '@angular/core'
import { ProductItem } from './product-item.interface'
import { isUint8ClampedArray } from 'util/types'

@Component({
  selector: 'app-shopping-list',
  templateUrl: '../index.html'
})

export class ShoppingListComponent implements OnInit {
  items: ProductItem[] = []
  filter: 'all' | 'purchased' | 'active' = 'all'

  ngOnInit(): void {
      this.loadFromTheStorage()
  }

  addItem(product: { name: string, cost: number, count: number }): void {
    const newItem : ProductItem = {
      id: ++this.items.length,
      itemCost: product.cost,
      itemCount: product.count,
      itemName: product.name,
      isItemPurchased: false
    }

    this.items.push(newItem)
    this.saveItemToStorage()
  }

  onPurchased(id: number): void {
    const item = this.items.find(item => item.id === id)

    if (item) {
      item.isItemPurchased = !item.isItemPurchased
      this.saveItemToStorage()
    }
  }

  loadFromTheStorage(): void {
    const storage = localStorage.getItem('shopping-list')

    if (storage)
      this.items = JSON.parse(storage)
  }

  setFilter(filteredBy: 'all' | 'purchased' | 'active'): void {
    this.filter = filteredBy
  }

  private saveItemToStorage(): void {
    localStorage.setItem('shopping-list', JSON.stringify(this.items))
  }
}
