import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailCommentsComponent } from './blog-detail-comments.component';

describe('BlogDetailCommentsComponent', () => {
  let component: BlogDetailCommentsComponent;
  let fixture: ComponentFixture<BlogDetailCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDetailCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
