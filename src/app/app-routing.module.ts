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

let routes: Routes = [
    {
        path: '',
        component: HomeDashboardComponent
    },
    {
        path: 'home',
        component: HomeDashboardComponent
    },
    {
        path: 'students',
        component: StdDashboardComponent,
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
                component: StdFormComponent
            }
        ]
    },
    {
        path: 'professors',
        component: ProfessorsDashboardComponent,
        children: [
            {
                path: 'addProfessor',
                component: ProfessorFormComponent
            },
            {
                path: ':profID',
                component: ProfessorDetailsComponent
            },
            {
                path: ':profID/edit',
                component: ProfessorFormComponent
            }
        ]
    },
    {
        path: 'courses',
        component: CoursesDashboardComponent,
        children: [
            {
                path: ':courseID',
                component: CourseDetailsComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}