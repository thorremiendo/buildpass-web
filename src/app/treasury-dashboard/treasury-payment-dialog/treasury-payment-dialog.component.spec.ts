import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryPaymentDialogComponent } from './treasury-payment-dialog.component';

describe('TreasuryPaymentDialogComponent', () => {
  let component: TreasuryPaymentDialogComponent;
  let fixture: ComponentFixture<TreasuryPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasuryPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
