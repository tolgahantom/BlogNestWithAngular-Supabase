import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  blogList: any[] = [];
  productsPerPage: number = 9;
  selectedPage: number = 1;
  numberOfPage: number = 0;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  changePage(page: number): void {
    this.selectedPage = page;
    this.loadBlogs();
    window.scrollTo(0, 0);
  }

  loadBlogs(): void {
    this.blogService
      .getAllBlogs(this.selectedPage, this.productsPerPage)
      .then((data) => {
        this.blogList = data;
      });

    this.blogService.getTotalBlogCount().then((count) => {
      this.numberOfPage = Math.ceil(count / this.productsPerPage);
    });
  }

  getPageArray(): number[] {
    return Array.from({ length: this.numberOfPage }, (_, i) => i + 1);
  }
}
