import { Component, OnInit } from '@angular/core'
import { ProductItem } from './product-item.interface'

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
      itemName: product.name
    }

    this.items.push(newItem)
    this.saveItemToStorage()
  }

  loadFromTheStorage(): void {
    const storage = localStorage.getItem('shopping-list')

    if (storage)
      this.items = JSON.parse(storage)
  }

  private saveItemToStorage(): void {
    localStorage.setItem('shopping-list', JSON.stringify(this.items))
  }
}
