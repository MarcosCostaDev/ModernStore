import { AuthService } from './services/auth.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SingupPageComponent } from './pages/singup-page/singup-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'home', component: HomePageComponent, canActivate: [AuthService] },
    { path: 'signup', component: SingupPageComponent },
    { path: 'cart', component: CartPageComponent, canActivate: [AuthService] },
];

export const RoutingProviders = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);