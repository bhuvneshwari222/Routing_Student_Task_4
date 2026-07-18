import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Icourse } from "../models/courses";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";



@Injectable({
    providedIn: 'root'
})
export class CourseResolver implements Resolve<Icourse | Icourse[]> {
    private _courseService = inject(CoursesService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Icourse | Icourse[] | Observable<Icourse | Icourse[]> | Promise<Icourse | Icourse[]> {
        let courseId = route.paramMap.get('courseID');
        if (courseId) {
            return this._courseService.fetchCourseById(courseId);
        } else {
            return this._courseService.fetchCourses();
        }
    }
}