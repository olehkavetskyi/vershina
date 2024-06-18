import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  total : number
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getTotal();
  }

  getOrders() {
    this.ordersService.getAllOrders().subscribe({
      next: response => {
        this.orders = response;
      }
    })
  }

  getTotal() {
    this.total = this.orders.map(item => item.total).reduce((p, n) => p + n, 0);
  }

}
