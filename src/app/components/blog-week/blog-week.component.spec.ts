import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogWeekComponent } from './blog-week.component';

describe('BlogWeekComponent', () => {
  let component: BlogWeekComponent;
  let fixture: ComponentFixture<BlogWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
