import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireClearanceComponent } from './fire-clearance.component';

describe('FireClearanceComponent', () => {
  let component: FireClearanceComponent;
  let fixture: ComponentFixture<FireClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireClearanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
