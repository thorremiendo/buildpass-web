import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPermitComponent } from './building-permit.component';

describe('BuildingPermitComponent', () => {
  let component: BuildingPermitComponent;
  let fixture: ComponentFixture<BuildingPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
