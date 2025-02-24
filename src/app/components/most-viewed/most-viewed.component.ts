import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-most-viewed',
  templateUrl: './most-viewed.component.html',
  styleUrl: './most-viewed.component.scss',
})
export class MostViewedComponent {
  @Input() lastBlog: any;
}
