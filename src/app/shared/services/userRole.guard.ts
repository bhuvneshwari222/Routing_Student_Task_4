import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
    private _authService = inject(AuthService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let userRolesArr: Array<string> = route.data['userRoles'];
        let loggedInUser: string = this._authService.getUserRole()!;
        return userRolesArr.includes(loggedInUser);
    }
}