import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFormSaveComponent } from './pdf-form-save.component';

describe('PdfFormSaveComponent', () => {
  let component: PdfFormSaveComponent;
  let fixture: ComponentFixture<PdfFormSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfFormSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfFormSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
