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

@NgModule({
  declarations: [AppComponent, HomePageComponent, BlogDetailComponent, NavbarComponent, FootComponent, HeaderComponent, MostViewedComponent, BlogWeekComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
