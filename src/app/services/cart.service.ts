import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Item[] = JSON.parse(localStorage.getItem('cart')) || [];
  constructor() {}
  public initialize() {}
  public async addItem(item: Item) {
    const index = this.items.findIndex((i) => i.uid === item.uid);
    if (index !== -1) {
      this.items[index].amount += 1;
    } else {
      this.items.push({ ...item, amount: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  public async removeItem(item: Item) {
    const index = this.items.findIndex((i) => i.uid === item.uid);
    if (index !== -1) {
      if (this.items[index].amount > 1) {
        this.items[index].amount -= 1;
      } else {
        this.items.splice(index, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  public getAmount(item: Item): number {
    const index = this.items.findIndex((i) => i.uid === item.uid);
    if (index !== -1) return this.items[index].amount;
    return 0;
  }
  public get getItems(): Item[] {
    return this.items;
  }
}
