import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail-comments',
  templateUrl: './blog-detail-comments.component.html',
  styleUrl: './blog-detail-comments.component.scss',
})
export class BlogDetailCommentsComponent {
  constructor() {}
}
