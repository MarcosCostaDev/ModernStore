import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  private serviceUrl: string = "http://localhost:54382/"

  constructor(public http: Http) {

  }

  authenticate(data: any): Observable<any> {
    let dt = `grant_type=password&username=${data.username}&password=${data.password}`;
    let headers = new Headers({
      "content-type": "application/x-www-form-urlencoded"
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.serviceUrl + "v1/authenticate", dt, options)
      .map((res: Response) => res.json())
  }

  getProducts(): Observable<any> {
    return this.http
      .get(this.serviceUrl + "v1/products")
      .map((res: Response) => res.json());
  }

  createOrder(data): Observable<any> {
    var token = localStorage.getItem('mws.token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${token}`); Headers
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.serviceUrl + 'v1/orders', data, options)
      .map((res: Response) => res.json());
  }

}
