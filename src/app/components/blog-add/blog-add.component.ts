import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { LoaderService } from '../../services/loader.service';

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
  isEditing = false;
  blogId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
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
    this.blogId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.isEditing = true;
      const blog = await this.blogService.getBlogById(this.blogId);
      if (blog) {
        console.log(blog[0]);

        this.blogForm.patchValue({
          title: blog[0].blog_title,
          category: blog[0].blog_category,
          content: blog[0].blog_content,
        });
      }
    }
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
    this.loaderService.show();
    const blog = {
      title: this.blogForm.value.title,
      category: this.blogForm.value.category,
      authorId: this.currentUser!.id,
      content: this.blogForm.value.content,
    };

    if (!this.isEditing) {
      this.blogService.addBlog(blog, this.selectedFile).then((data) => {
        this.loaderService.hide();
        this.router.navigate(['blog-list']);
      });
    } else {
      this.blogService
        .editBlog(this.blogId!, blog, this.selectedFile! || null)
        .then((data) => {
          this.loaderService.hide();
          this.router.navigate(['blog-list']);
        });
    }
  }
}
