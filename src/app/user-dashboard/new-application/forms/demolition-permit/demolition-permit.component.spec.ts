import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemolitionPermitComponent } from './demolition-permit.component';

describe('DemolitionPermitComponent', () => {
  let component: DemolitionPermitComponent;
  let fixture: ComponentFixture<DemolitionPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemolitionPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemolitionPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
