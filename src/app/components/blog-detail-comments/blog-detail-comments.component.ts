import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-blog-detail-comments',
  templateUrl: './blog-detail-comments.component.html',
  styleUrl: './blog-detail-comments.component.scss',
})
export class BlogDetailCommentsComponent implements OnInit {
  comments: any[] = [];
  @Input() id: any;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    if (this.id) {
      this.commentService.getComments(this.id).then((data) => {
        this.comments = data;
        console.log(data);
      });
    }
  }
}
