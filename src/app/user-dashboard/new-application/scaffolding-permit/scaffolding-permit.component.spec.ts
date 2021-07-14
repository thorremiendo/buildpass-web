import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffoldingPermitComponent } from './scaffolding-permit.component';

describe('ScaffoldingPermitComponent', () => {
  let component: ScaffoldingPermitComponent;
  let fixture: ComponentFixture<ScaffoldingPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaffoldingPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaffoldingPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
