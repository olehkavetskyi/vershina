import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../shared/models/order';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: Order;

  constructor(private ordersService: OrdersService, private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id) {
      this.ordersService.getOrder(id).subscribe({
        next: (order) => {
          this.order = order;  
      }}) 
    } 
  } 

  getOrder(id: string) {
    this.ordersService.getOrder(id).subscribe({
      next: responce => {
        this.order = responce;
      }
    })
  }
}
