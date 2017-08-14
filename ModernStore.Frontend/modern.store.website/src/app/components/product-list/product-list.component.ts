import { CartService } from './../../services/cart.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [DataService]
})
export class ProductListComponent implements OnInit {

  public products: any[];
  constructor(private dataService: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(result => {
      console.log(result);
      this.products = result;
    })
  }
  addToCart(product) {
    this.cartService.addItem({ id: product.id, title: product.title, segment: product.segment, price: product.price, quantity: 1 });
  }





}
