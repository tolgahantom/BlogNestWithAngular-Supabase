import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFeaturesComponent } from './blog-features.component';

describe('BlogFeaturesComponent', () => {
  let component: BlogFeaturesComponent;
  let fixture: ComponentFixture<BlogFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
