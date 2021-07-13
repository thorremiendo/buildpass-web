import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalPermitComponent } from './mechanical-permit.component';

describe('MechanicalPermitComponent', () => {
  let component: MechanicalPermitComponent;
  let fixture: ComponentFixture<MechanicalPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicalPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicalPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
