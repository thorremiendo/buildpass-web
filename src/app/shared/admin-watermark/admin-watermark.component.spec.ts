import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWatermarkComponent } from './admin-watermark.component';

describe('AdminWatermarkComponent', () => {
  let component: AdminWatermarkComponent;
  let fixture: ComponentFixture<AdminWatermarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWatermarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWatermarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
