import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldBpDetailsComponent } from './old-bp-details.component';

describe('OldBpDetailsComponent', () => {
  let component: OldBpDetailsComponent;
  let fixture: ComponentFixture<OldBpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldBpDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldBpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
