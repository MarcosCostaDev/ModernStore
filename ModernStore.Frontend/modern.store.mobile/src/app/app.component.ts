import { CartProvider } from './../providers/cart';
import { UserProvider } from './../providers/user';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  public user: any;
  public items: any[] = [];

  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userProvider: UserProvider,
    private cartProvider: CartProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: "unlock", title: 'Login', component: "LoginPage" },
      { icon: "home", title: 'Home', component: "HomePage" },
    ];

    this.userProvider.userChange.subscribe(data => {
      this.user = this.userProvider.loadUser();
    });

    this.cartProvider.cartChange.subscribe(data => {
      this.items = data;
    });

    this.cartProvider.load();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToCart() {
    this.nav.setRoot("CartPage");
  }

  logout() {
    this.userProvider.logout();
    this.nav.setRoot("LoginPage");
  }
}
