import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  providers: [DataService]
})
export class CartPageComponent implements OnInit {


  public items: any[] = [];
  public discount: number = 0;
  public deliveryFee: number = 0;
  constructor(
    private cartService: CartService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.items = this.cartService.items;
  }

  remove(item) {
    this.cartService.removeItem(item.id);
  }


  getSubTotal(): number {
    return this.cartService.getSubTotal();
  }


  checkQuantity(item) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }


  checkout() {
    var user = JSON.parse(localStorage.getItem('mws.user'));
    var data = {
      customer: user.id,
      deliveryFee: this.deliveryFee,
      discount: this.discount,
      items: []
    };

    for (let i of this.cartService.items) {
      data.items.push({
        product: i.id,
        quantity: i.quantity
      })
    }

    this.dataService.createOrder(data)
      .subscribe(result => {
        alert('Pedido criado com sucesso!');
        this.cartService.clear();
        this.router.navigateByUrl('/home');
      }, err => {
        console.log(err);
      });
  }

}
