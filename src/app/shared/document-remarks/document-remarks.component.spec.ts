import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRemarksComponent } from './document-remarks.component';

describe('DocumentRemarksComponent', () => {
  let component: DocumentRemarksComponent;
  let fixture: ComponentFixture<DocumentRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
