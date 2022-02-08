import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOneDialogComponent } from './step-one-dialog.component';

describe('StepOneDialogComponent', () => {
  let component: StepOneDialogComponent;
  let fixture: ComponentFixture<StepOneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepOneDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
