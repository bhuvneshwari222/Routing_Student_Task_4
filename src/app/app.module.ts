import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StdDashboardComponent } from './shared/components/std-dashboard/std-dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { HomeDashboardComponent } from './shared/components/home-dashboard/home-dashboard.component';
import { ProfessorsDashboardComponent } from './shared/components/professors-dashboard/professors-dashboard.component';
import { CoursesDashboardComponent } from './shared/components/courses-dashboard/courses-dashboard.component';
import { CourseDetailsComponent } from './shared/components/courses-dashboard/course-details/course-details.component';
import { CourseCardsComponent } from './shared/components/courses-dashboard/course-cards/course-cards.component';
import { ProfessorFormComponent } from './shared/components/professors-dashboard/professor-form/professor-form.component';
import { ProfessorDetailsComponent } from './shared/components/professors-dashboard/professor-details/professor-details.component';
import { StdDetailsComponent } from './shared/components/std-dashboard/std-details/std-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StdDashboardComponent,
    NavbarComponent,
    GetConfirmComponent,
    HomeDashboardComponent,
    ProfessorsDashboardComponent,
    CoursesDashboardComponent,
    CourseDetailsComponent,
    CourseCardsComponent,
    ProfessorFormComponent,
    ProfessorDetailsComponent,
    StdDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
