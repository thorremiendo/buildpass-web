import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlansComponent } from './building-plans.component';

describe('BuildingPlansComponent', () => {
  let component: BuildingPlansComponent;
  let fixture: ComponentFixture<BuildingPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
