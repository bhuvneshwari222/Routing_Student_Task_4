import { Component, Input, OnInit } from '@angular/core';
import { Icourse } from 'src/app/shared/models/courses';

@Component({
  selector: 'app-course-cards',
  templateUrl: './course-cards.component.html',
  styleUrls: ['./course-cards.component.scss']
})
export class CourseCardsComponent implements OnInit {
  @Input() courseObj !: Icourse;
  constructor() { }

  ngOnInit(): void {
  }

}
