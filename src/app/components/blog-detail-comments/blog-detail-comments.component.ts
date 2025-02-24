import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog-detail-comments',
  templateUrl: './blog-detail-comments.component.html',
  styleUrl: './blog-detail-comments.component.scss',
})
export class BlogDetailCommentsComponent implements OnInit {
  @Input() id: any;
  @Input() blogId: any;
  comments: any[] = [];
  commentForm: FormGroup;
  userId: string = '';
  replyInputOpen: { [key: number]: boolean } = {};
  replyContent: string = '';

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.authService.currentUser$.subscribe((data) => {
      if (data) {
        this.userId = data.id;
      }
    });
    this.commentForm = this.fb.group({
      content: [''],
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.fetchComments();
    }
  }

  fetchComments() {
    this.commentService.getComments(this.id).then((data) => {
      this.comments = data;
      console.log(data);
    });
  }

  addComment() {
    this.commentService
      .addComment(this.blogId, this.userId, this.commentForm.value.content)
      .then((data) => {
        this.fetchComments();
        this.commentForm.reset();
      });
  }

  toggleReplyInput(commentId: any) {
    this.replyInputOpen[commentId] = !this.replyInputOpen[commentId];
  }

  submitReply(commentid: string) {
    this.commentService
      .addComment(this.blogId, this.userId, this.replyContent, commentid)
      .then((data) => {
        this.replyContent = '';
        this.toggleReplyInput(commentid);
        this.fetchComments();
      });
  }
}
