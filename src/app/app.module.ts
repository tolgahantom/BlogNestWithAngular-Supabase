import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FootComponent } from './shared/foot/foot.component';
import { HeaderComponent } from './shared/header/header.component';
import { MostViewedComponent } from './components/most-viewed/most-viewed.component';
import { BlogWeekComponent } from './components/blog-week/blog-week.component';
import { BlogCategoryComponent } from './components/blog-category/blog-category.component';
import { MobilAppComponent } from './components/mobil-app/mobil-app.component';
import { OurCreatetorsComponent } from './components/our-createtors/our-createtors.component';
import { ParallaxComponent } from './components/parallax/parallax.component';
import { UpdateComponent } from './components/update/update.component';
import { BlogFeaturesComponent } from './components/blog-features/blog-features.component';
import { DetailComponent } from './components/detail/detail.component';
import { BlogDetailCommentsComponent } from './components/blog-detail-comments/blog-detail-comments.component';
import { ModalComponent } from './shared/modal/modal.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogsComponent } from './components/blogs/blogs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BlogDetailComponent,
    NavbarComponent,
    FootComponent,
    HeaderComponent,
    MostViewedComponent,
    BlogWeekComponent,
    BlogCategoryComponent,
    MobilAppComponent,
    OurCreatetorsComponent,
    ParallaxComponent,
    UpdateComponent,
    BlogFeaturesComponent,
    DetailComponent,
    BlogDetailCommentsComponent,
    ModalComponent,
    BlogListComponent,
    BlogsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
