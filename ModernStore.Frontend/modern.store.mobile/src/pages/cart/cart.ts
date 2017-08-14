import { DataProvider } from './../../providers/data';
import { CartProvider } from './../../providers/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [DataProvider]
})
export class CartPage {
  discount: number = 0;
  deliveryFee: number = 0;
  public products = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private alertCtrl: AlertController,
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.products = this.cartProvider.items;
  }

  getSubTotal() {
    return this.cartProvider.getSubTotal()
  }

  checkout() {
    var user = JSON.parse(localStorage.getItem('mws.user'));
    var data = {
      customer: user.id,
      deliveryFee: this.deliveryFee,
      discount: this.discount,
      items: []
    };

    for (let i of this.cartProvider.items) {
      data.items.push({
        product: i.id,
        quantity: i.quantity
      })
    }

    this.dataProvider.createOrder(data)
      .subscribe(result => {
        this.cartProvider.clear();
        this.alertCtrl.create({
          title: "Checkout",
          message: "Seu pedido foi realizado com sucesso e será enviado em breve",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.navCtrl.setRoot("HomePage");
              }
            }
          ]
        }).present();

      }, err => {
        console.log(err);
      });
  }

}
