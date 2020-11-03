import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffidavitFilesComponent } from './affidavit-files.component';

describe('AffidavitFilesComponent', () => {
  let component: AffidavitFilesComponent;
  let fixture: ComponentFixture<AffidavitFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffidavitFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffidavitFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
