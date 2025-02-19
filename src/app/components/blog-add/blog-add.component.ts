import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss',
})
export class BlogAddComponent implements OnInit {
  editor: Editor;
  html = '';
  blogForm: FormGroup;
  currentUser: UserModel | null = null;
  userSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {
    this.editor = new Editor();
    this.blogForm = this.fb.group({
      title: [''],
      category: [''],
      content: [''],
    });
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  saveBlog() {
    const blog = {
      title: this.blogForm.value.title,
      category: this.blogForm.value.category,
      authorId: this.currentUser!.id,
      content: this.blogForm.value.content,
    };
    console.log('clicked');
    console.log(blog);
    this.blogService
      .addBlog(blog)
      .then(() => {
        alert('Blog Kaydedildi');
        this.router.navigate(['']);
      })
      .catch((err) => console.log(err));
  }
}
