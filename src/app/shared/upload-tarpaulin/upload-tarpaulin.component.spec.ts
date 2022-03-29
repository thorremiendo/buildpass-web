import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTarpaulinComponent } from './upload-tarpaulin.component';

describe('UploadTarpaulinComponent', () => {
  let component: UploadTarpaulinComponent;
  let fixture: ComponentFixture<UploadTarpaulinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTarpaulinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTarpaulinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
