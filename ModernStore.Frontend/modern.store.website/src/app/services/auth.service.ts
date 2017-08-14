import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!localStorage.getItem("mws.token")) {
            this.router.navigate(['/']);
            return false;
        }

        var data: any = JSON.parse(localStorage.getItem("mws.user"));
        if (!data) {
            this.router.navigate(["/home"]);
            return false;
        }

        return true;
    }
}