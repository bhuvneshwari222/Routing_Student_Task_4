import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsDashboardComponent } from './professors-dashboard.component';

describe('ProfessorsDashboardComponent', () => {
  let component: ProfessorsDashboardComponent;
  let fixture: ComponentFixture<ProfessorsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
