import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-week',
  templateUrl: './blog-week.component.html',
  styleUrl: './blog-week.component.scss',
})
export class BlogWeekComponent {
  @Input() blogs: any;
}
