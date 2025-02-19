import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'blog-add', component: BlogAddComponent },
  { path: 'blog-list', component: BlogListComponent },
  { path: 'detail/:id', component: BlogDetailComponent },
  { path: 'category-edit', component: CategoryEditComponent },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
