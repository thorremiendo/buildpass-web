import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedIdentificationComponent } from './uploaded-identification.component';

describe('UploadedIdentificationComponent', () => {
  let component: UploadedIdentificationComponent;
  let fixture: ComponentFixture<UploadedIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
