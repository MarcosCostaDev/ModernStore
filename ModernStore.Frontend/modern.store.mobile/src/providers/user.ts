import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  public user: any;
  public userChange: Observable<any>;
  public userChangeObserver: Observer<any>;
  constructor(public http: Http) {

    this.userChange = new Observable((observer: Observer<any>) => {
      this.userChangeObserver = observer;
    });

    let data = localStorage.getItem("mws.user");
    if (data) {
      this.user = data;
    }
  }

  authenticate(): boolean {
    let data = localStorage.getItem("mws.user");
    if (data) {
      this.user = data;
      this.userChangeObserver.next(this.user);
      return true;
    }
    return false;
  }

  loadToken(): any {
    let data = localStorage.getItem("mws.token");
    if (data) {
      return data;
    }
  }

  loadUser(): any {
    let data = localStorage.getItem("mws.user");
    if (data) {
      this.user = data;
      return JSON.parse(data);
    }
  }

  save(user: any, token: string) {
    let data = JSON.stringify(user);
    localStorage.setItem("mws.token", token);
    localStorage.setItem("mws.user", data);
    this.user = user;
    this.userChangeObserver.next(this.user);
  }

  logout() {
    localStorage.removeItem("mws.token");
    localStorage.removeItem("mws.user");

    setTimeout(() => {
      this.user = {};
      this.userChangeObserver.next(this.user);
    }, 1000);
  }

}
