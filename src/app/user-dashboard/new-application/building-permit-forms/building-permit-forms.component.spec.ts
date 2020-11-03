import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPermitFormsComponent } from './building-permit-forms.component';

describe('BuildingPermitFormsComponent', () => {
  let component: BuildingPermitFormsComponent;
  let fixture: ComponentFixture<BuildingPermitFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPermitFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPermitFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
