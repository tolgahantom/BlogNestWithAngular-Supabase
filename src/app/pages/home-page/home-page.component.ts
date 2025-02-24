import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  lastBlog: any;
  mostReadBlogs: any;
  constructor(public blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getLastBlog().then((data) => {
      if (data) {
        this.lastBlog = data[0];
      }
    });
    this.blogService.getMostReadBlog().then((data) => {
      if (data) {
        this.mostReadBlogs = data;
      }
    });
  }
}
