import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcavationPermitComponent } from './excavation-permit.component';

describe('ExcavationPermitComponent', () => {
  let component: ExcavationPermitComponent;
  let fixture: ComponentFixture<ExcavationPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcavationPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcavationPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
