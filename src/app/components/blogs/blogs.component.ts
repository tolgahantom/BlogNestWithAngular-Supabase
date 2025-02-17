import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

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

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
    this.numberOfPage = Math.ceil(
      this.blogService.getTotalBlogCount() / this.productsPerPage
    );
  }

  loadBlogs(): void {
    this.blogService
      .getAllBlogs(this.selectedPage, this.productsPerPage)
      .subscribe((data) => (this.blogList = data));
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
