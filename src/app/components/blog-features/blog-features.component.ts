import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-features',
  templateUrl: './blog-features.component.html',
  styleUrl: './blog-features.component.scss',
})
export class BlogFeaturesComponent {
  @Input() title!: string;
  @Input() category!: string;
  @Input() author!: string;
  @Input() uploadDate!: string;
}
