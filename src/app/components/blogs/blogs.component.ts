import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  blogList: any[] = [];
  productsPerPage: number = 9;
  selectedPage: number = 1;
  numberOfPage: number = 0;

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService
      .getAllBlogs(this.selectedPage, this.productsPerPage)
      .then((data) => {
        this.blogList = data;
        console.log(data);
      });

    this.blogService.getTotalBlogCount().then((count) => {
      this.numberOfPage = Math.ceil(count / this.productsPerPage);
    });
  }

  changePage(page: number): void {
    this.selectedPage = page;
    this.loadBlogs();
    window.scrollTo(0, 0);
  }

  getPageArray(): number[] {
    return Array.from({ length: this.numberOfPage }, (_, i) => i + 1);
  }
}
