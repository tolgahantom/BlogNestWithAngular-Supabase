import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

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
  categories: any[] = [];
  selectedFile: File | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.editor = new Editor();
    this.blogForm = this.fb.group({
      title: [''],
      category: [''],
      content: [''],
    });
  }

  async ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
    this.categories = await this.categoryService.getAllCategories();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Seçilen dosya:', this.selectedFile);
    } else {
      console.warn('Dosya seçilmedi veya geçersiz dosya formatı.');
    }
  }

  async saveBlog() {
    const blog = {
      title: this.blogForm.value.title,
      category: this.blogForm.value.category,
      authorId: this.currentUser!.id,
      content: this.blogForm.value.content,
    };

    this.blogService.addBlog(blog, this.selectedFile).then((data) => {
      alert('blog eklendi');
      this.router.navigate(['']);
    });
  }
}
