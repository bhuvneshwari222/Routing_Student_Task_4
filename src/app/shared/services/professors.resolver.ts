import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProfessor } from "../models/professor";
import { ProfessorsService } from "./professors.service";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProfessorResolver implements Resolve<IProfessor | IProfessor[]> {
    private _professorService = inject(ProfessorsService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProfessor | IProfessor[] | Observable<IProfessor | IProfessor[]> | Promise<IProfessor | IProfessor[]> {
        let professorId = route.paramMap.get('profID');
        if (professorId) {
            return this._professorService.fetchProfessorById(professorId);
        } else {
            return this._professorService.fetchProfessors();
        }
    }
}