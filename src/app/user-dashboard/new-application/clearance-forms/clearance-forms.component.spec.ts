import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceFormsComponent } from './clearance-forms.component';

describe('ClearanceFormsComponent', () => {
  let component: ClearanceFormsComponent;
  let fixture: ComponentFixture<ClearanceFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearanceFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
