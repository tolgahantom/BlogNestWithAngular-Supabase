import { Component, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.scss',
})
export class BlogCategoryComponent {
  @Input() categories: any;
}
