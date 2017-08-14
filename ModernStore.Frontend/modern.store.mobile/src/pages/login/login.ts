import { UserProvider } from './../../providers/user';
import { DataProvider } from './../../providers/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DataProvider]
})
export class LoginPage {

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dataProvider: DataProvider,
    private userProvider: UserProvider) {

    this.form = this.fb.group({
      username: ["", Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ["", Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    if (this.userProvider.authenticate()) {
      this.navCtrl.setRoot("HomePage");
    }
  }

  ionViewDidLoad() {

  }

  submit() {
    let loading = this.loadingCtrl.create({
      content: "Autenticando"
    });
    loading.present();

    this.dataProvider.authenticate(this.form.value)
      .subscribe(data => {
        loading.dismiss();
        this.userProvider.save(data.user, data.token);
        this.navCtrl.setRoot("HomePage");
      }, error => {
        loading.dismiss();
        this.alertCtrl.create({
          title: "Ops, algo deu errado...",
          subTitle: error.json().message,
          buttons: ["ok"]
        }).present();
      });
  }

}
