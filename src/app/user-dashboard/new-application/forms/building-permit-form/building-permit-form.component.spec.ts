import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPermitFormComponent } from './building-permit-form.component';

describe('BuildingPermitFormComponent', () => {
  let component: BuildingPermitFormComponent;
  let fixture: ComponentFixture<BuildingPermitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPermitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPermitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
