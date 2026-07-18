import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeDashboardComponent } from "./shared/components/home-dashboard/home-dashboard.component";
import { StdDashboardComponent } from "./shared/components/std-dashboard/std-dashboard.component";
import { StdFormComponent } from "./shared/components/std-dashboard/std-form/std-form.component";
import { StdDetailsComponent } from "./shared/components/std-dashboard/std-details/std-details.component";
import { ProfessorsDashboardComponent } from "./shared/components/professors-dashboard/professors-dashboard.component";
import { ProfessorFormComponent } from "./shared/components/professors-dashboard/professor-form/professor-form.component";
import { ProfessorDetailsComponent } from "./shared/components/professors-dashboard/professor-details/professor-details.component";
import { CoursesDashboardComponent } from "./shared/components/courses-dashboard/courses-dashboard.component";
import { CourseDetailsComponent } from "./shared/components/courses-dashboard/course-details/course-details.component";
import { CourseResolver } from "./shared/services/courses.resolver";
import { ProfessorResolver } from "./shared/services/professors.resolver";
import { AuthComponent } from "./shared/components/auth/auth.component";
import { AuthGuard } from "./shared/services/auth.guard";
import { UserRoleGuard } from "./shared/services/userRole.guard";
import { CanDeactivateGuard } from "./shared/services/canDeactivate.guard";

let routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'home',
        component: HomeDashboardComponent,
        title: 'Home',
        canActivate: [AuthGuard, UserRoleGuard],
        data: {
            userRoles: ['admin', 'superAdmin', 'buyer']
        }
    },
    {
        path: 'students',
        component: StdDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        title: 'Student',
        data: {
            userRoles: ['admin', 'superAdmin', 'buyer']
        },
        children: [
            {
                path: 'addStudent',
                component: StdFormComponent
            },
            {
                path: ':stdID',
                component: StdDetailsComponent
            },
            {
                path: ':stdID/edit',
                component: StdFormComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    {
        path: 'professors',
        component: ProfessorsDashboardComponent,
        title: 'Professors',
        canActivate: [AuthGuard, UserRoleGuard],
        resolve: {
            professors: ProfessorResolver
        },
        data: {
            userRoles: ['admin', 'superAdmin']
        },
        children: [
            {
                path: 'addProfessor',
                component: ProfessorFormComponent
            },
            {
                path: ':profID',
                component: ProfessorDetailsComponent,
                resolve: {
                    professor: ProfessorResolver
                },
            },
            {
                path: ':profID/edit',
                component: ProfessorFormComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    {
        path: 'courses',
        component: CoursesDashboardComponent,
        title: 'Courses',
        canActivate: [AuthGuard, UserRoleGuard],
        resolve: {
            courses: CourseResolver
        },
        data: {
            userRoles: ['superAdmin']
        },
        children: [
            {
                path: ':courseID',
                component: CourseDetailsComponent,
                resolve: {
                    course: CourseResolver
                },
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }