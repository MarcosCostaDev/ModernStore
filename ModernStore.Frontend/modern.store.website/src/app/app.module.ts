import { AuthService } from './services/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//rotas
import { Routing, RoutingProviders } from './app.routing';

//root
import { AppComponent } from './app.component';

//shared
import { HeadBarComponent } from './components/shared/head-bar/head-bar.component';
import { SubmenuComponent } from './components/shared/submenu/submenu.component';
import { FooterComponent } from './components/shared/footer/footer.component';

//components
import { ProductListComponent } from './components/product-list/product-list.component';

//pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SingupPageComponent } from './pages/singup-page/singup-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HttpModule } from "@angular/http";

//Service
import { CartService } from './services/cart.service';

//directives
import { NumberDirective } from './directives/number.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SubmenuComponent,
    ProductListComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    SingupPageComponent,
    CartPageComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    Routing,
    RoutingProviders,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    CartService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
