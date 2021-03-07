import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfpResidentialChecklistComponent } from './bfp-residential-checklist.component';

describe('BfpResidentialChecklistComponent', () => {
  let component: BfpResidentialChecklistComponent;
  let fixture: ComponentFixture<BfpResidentialChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfpResidentialChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfpResidentialChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
