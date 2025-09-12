import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    ShoppingListComponent,
    ShoppingItemComponent,
    AddItemFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
