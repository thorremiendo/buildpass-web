import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesDialogComponent } from './fees-dialog.component';

describe('FeesDialogComponent', () => {
  let component: FeesDialogComponent;
  let fixture: ComponentFixture<FeesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
