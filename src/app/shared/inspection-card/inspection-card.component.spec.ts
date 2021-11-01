import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionCardComponent } from './inspection-card.component';

describe('InspectionCardComponent', () => {
  let component: InspectionCardComponent;
  let fixture: ComponentFixture<InspectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
