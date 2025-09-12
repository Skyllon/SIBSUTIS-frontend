import { Component } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShoppingListComponent],
  template: `<app-shopping-list></app-shopping-list>`,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px 0;
    }
  `]
})
export class AppComponent {}
