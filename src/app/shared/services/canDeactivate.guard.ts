import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { canDeactivateComponent } from "../models/canDeactivateComponent";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<canDeactivateComponent>{
    canDeactivate(component: canDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate();
    }
}