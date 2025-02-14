import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCreatetorsComponent } from './our-createtors.component';

describe('OurCreatetorsComponent', () => {
  let component: OurCreatetorsComponent;
  let fixture: ComponentFixture<OurCreatetorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurCreatetorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCreatetorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
