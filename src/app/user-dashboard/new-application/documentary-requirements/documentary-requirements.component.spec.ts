import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryRequirementsComponent } from './documentary-requirements.component';

describe('DocumentaryRequirementsComponent', () => {
  let component: DocumentaryRequirementsComponent;
  let fixture: ComponentFixture<DocumentaryRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentaryRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
