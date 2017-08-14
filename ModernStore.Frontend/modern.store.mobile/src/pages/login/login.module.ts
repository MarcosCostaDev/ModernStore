import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(LoginPage)
  ],
})
export class LoginPageModule {}
