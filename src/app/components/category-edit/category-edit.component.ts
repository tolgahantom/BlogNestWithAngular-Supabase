import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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
    this.categoryService
      .addCategory(this.categoryForm.value.name)
      .then((category) => {
        alert('Kategori eklendi');
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
    this.categoryService
      .deleteCategory(id)
      .then(() => {
        alert('Kategori silindi');
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
