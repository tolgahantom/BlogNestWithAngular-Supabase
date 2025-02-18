import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogAddComponent } from './components/blog-add/blog-add.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'detail/:id', component: BlogDetailComponent },
  { path: 'blog-list', component: BlogListComponent },
  { path: 'blog-add', component: BlogAddComponent },
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
