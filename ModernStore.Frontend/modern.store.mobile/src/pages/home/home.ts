import { CartProvider } from './../../providers/cart';
import { DataProvider } from './../../providers/data';
import { Component } from '@angular/core';
import { NavController, IonicPage, ItemSliding, ToastController, ModalController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataProvider]
})
export class HomePage {
  public products = [];
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private dataProvider: DataProvider,
    private modalCtrl: ModalController,
    private cartProvider: CartProvider,
    private push: Push) {

    this.dataProvider.getProducts().subscribe(data => {
      this.products = data;
    });


  }

  showDetails(product) {
    this.modalCtrl.create("ProductDetailsPage", { product: product }).present();
  }

  addToCart(slidingItem: ItemSliding, product: any) {
    this.cartProvider.addItem({ id: product.id, title: product.title, segment: product.segment, price: product.price, quantity: 1 });
    slidingItem.close();
    this.toastCtrl.create({
      message: "Produto adicionado ao carrinho",
      duration: 1500
    }).present();
  }

  ionViewDidLoad() {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        this.toastCtrl.create({
          message: msg.text,
          duration: 1500
        }).present();
      });
  }

}
