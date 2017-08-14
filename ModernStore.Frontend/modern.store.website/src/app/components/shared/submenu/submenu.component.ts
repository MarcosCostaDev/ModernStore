import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  public user: string = "";
  public totalItems: number = 0;
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cartChange.subscribe((data) => {
      console.log(data);
      this.totalItems = data.length;
    })

    let data: any = localStorage.getItem("mws.user");
    if (data) {
      let user = JSON.parse(data).name
      this.user = user;
    }

    this.cartService.load();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem("mws.user");
    localStorage.removeItem("mws.token");
    this.router.navigateByUrl("/");
  }

}
