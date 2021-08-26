import { Component, Input } from '@angular/core';
import { Unit } from 'src/app/models/constants';
import { CartService } from 'src/app/services/cart.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'single-item',
  template: `
    <div class="itemx" [ngClass]="{ active: cartService.getAmount(item) > 0 }">
      <div class="itemx-image">
        <ion-chip color="primary">
          {{ UNITS[item?.unit] }}
        </ion-chip>
        <img [src]="item?.thumbnail" />
        <div class="itemx-actions">
          <span
            (click)="cartService.addItem(item)"
            class="itemx-actions-props itemx-actions-add"
          >
            +
          </span>
          <span class="itemx-actions-props itemx-actions-number">
            {{ cartService.getAmount(item) }}
          </span>
          <span
            (click)="cartService.removeItem(item)"
            class="itemx-actions-props itemx-actions-trash"
          >
            –
          </span>
        </div>
      </div>
      <div class="itemx-text">
        <h6>
          {{ item?.title }}
        </h6>
        <p>
          {{ item?.description }}
        </p>
      </div>
    </div>
  `,
})
export class SingleItemComponent {
  readonly UNITS = Unit;
  @Input('item') item: Item | null | undefined = null;
  constructor(public cartService: CartService) {}
}
