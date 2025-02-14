import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilAppComponent } from './mobil-app.component';

describe('MobilAppComponent', () => {
  let component: MobilAppComponent;
  let fixture: ComponentFixture<MobilAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobilAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
