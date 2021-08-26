import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/models/constants';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  readonly UNITS = Unit;
  constructor(public cartService: CartService) {}

  ngOnInit() {}
}
