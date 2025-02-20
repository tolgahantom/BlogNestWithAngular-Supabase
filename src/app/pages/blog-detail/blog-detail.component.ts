import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
  blog: any = null;
  blogId: string = '';

  constructor(
    private blogService: BlogService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.blogId = params.get('id') || '';
      if (this.blogId) {
        this.getBlogById(this.blogId);
      }
    });
  }

  getBlogById(id: string) {
    this.blogService.getBlogById(id).then((res) => {
      if (res) {
        this.blog = res[0];
      }
      console.log(this.blog);
    });
  }
}
