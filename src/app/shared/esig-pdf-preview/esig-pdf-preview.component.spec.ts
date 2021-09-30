import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsigPdfPreviewComponent } from './esig-pdf-preview.component';

describe('EsigPdfPreviewComponent', () => {
  let component: EsigPdfPreviewComponent;
  let fixture: ComponentFixture<EsigPdfPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsigPdfPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsigPdfPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
