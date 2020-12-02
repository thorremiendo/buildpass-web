import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalPermitFormComponent } from './electrical-permit-form.component';

describe('ElectricalPermitFormComponent', () => {
  let component: ElectricalPermitFormComponent;
  let fixture: ComponentFixture<ElectricalPermitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricalPermitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalPermitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
