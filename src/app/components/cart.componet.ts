import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'cart',
  template: `
    <h6>Cart</h6>
    <div *ngFor="let item of cartService.getItems" class="items">
      <div class="items-image">
        <img [src]="item?.thumbnail" />
        <div class="items-actions">
          <span
            (click)="cartService.removeItem(item)"
            class="items-actions-props items-actions-trash"
          >
            –
          </span>
        </div>
      </div>
      <div class="items-text">
        <p>{{ item.amount }}x {{ item?.title }}</p>
      </div>
    </div>
    <div total>
      <ion-button routerLink="/checkout"> Done </ion-button>
      <h6>Total: {{ cartService.getItems.length }}</h6>
    </div>
  `,
})
export class CartComponent {
  constructor(public cartService: CartService) {}
}
