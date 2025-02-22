import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { filter, Observable, switchMap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { BlogService } from '../../services/blog.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<UserModel | null>;
  readBlogs: any[] = [];
  writtenBlogs: any[] = [];

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    public loaderService: LoaderService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.currentUser$
      .pipe(
        filter((user) => !!user),
        switchMap((user) => this.blogService.getUserBlogs(user!.id))
      )
      .subscribe(({ readBlogs, writtenBlogs }) => {
        this.loaderService.hide();
        this.readBlogs = readBlogs;
        this.writtenBlogs = writtenBlogs;
      });
  }
}
