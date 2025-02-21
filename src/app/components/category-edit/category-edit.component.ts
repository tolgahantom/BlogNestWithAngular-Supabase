import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent implements OnInit {
  categories: any[] = [];
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.categoryService.getAllCategories().then((categories) => {
      this.categories = categories;
    });
  }

  addCategory() {
    this.loaderService.show();
    this.categoryService
      .addCategory(this.categoryForm.value.name)
      .then((category) => {
        this.loaderService.hide();
        this.categoryForm.reset();
        return this.categoryService.getAllCategories();
      })
      .then((categories) => {
        this.categories = categories;
      })
      .catch((error) => {
        console.error('Kategori ekleme hatası:', error);
      });
  }

  deleteCategory(id: string) {
    if (!confirm('Silmek istediğinizden emin misiniz?')) return;
    this.loaderService.show();
    this.categoryService
      .deleteCategory(id)
      .then(() => {
        this.loaderService.hide();
        return this.categoryService.getAllCategories();
      })
      .then((categories) => {
        this.categories = categories;
      })
      .catch((err) => {
        console.error('Kategori silme hatası:', err);
      });
  }
}
