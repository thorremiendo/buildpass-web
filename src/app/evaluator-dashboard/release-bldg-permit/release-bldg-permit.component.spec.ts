import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseBldgPermitComponent } from './release-bldg-permit.component';

describe('ReleaseBldgPermitComponent', () => {
  let component: ReleaseBldgPermitComponent;
  let fixture: ComponentFixture<ReleaseBldgPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseBldgPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseBldgPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
