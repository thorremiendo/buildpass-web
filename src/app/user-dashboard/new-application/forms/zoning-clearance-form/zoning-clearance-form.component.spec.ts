import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoningClearanceFormComponent } from './zoning-clearance-form.component';

describe('ZoningClearanceFormComponent', () => {
  let component: ZoningClearanceFormComponent;
  let fixture: ComponentFixture<ZoningClearanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoningClearanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoningClearanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
