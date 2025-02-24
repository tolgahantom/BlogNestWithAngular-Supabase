import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
  blog: any = null;
  public blogId: string = '';
  userId: string = '';

  constructor(
    private blogService: BlogService,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.blogId = params.get('id') || '';
      if (this.blogId) {
        this.getBlogById(this.blogId);
      }
    });

    this.authService.currentUser$.subscribe((user) => {
      this.userId = user?.id || '';
    });
  }

  getBlogById(id: string) {
    this.blogService.getBlogById(id).then((res) => {
      if (res) {
        this.blog = res[0];

        if (this.userId && this.blogId) {
          this.blogService.increaseViewCount(this.blogId, this.userId);
        }
      }
    });
  }
}
