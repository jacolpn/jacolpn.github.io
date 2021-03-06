import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { CartItem } from './../../restaurant-detail/shopping-cart/shopping-cart.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[];

  @Output() increaseQty = new EventEmitter<CartItem>();
  @Output() decreaseQty = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit(): void { }

  emitIncreaseQty(item: CartItem): void {
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CartItem): void {
    this.decreaseQty.emit(item);
  }

  emitRemove(item: CartItem): void {
    this.remove.emit(item);
  }
}
