import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPermitsComponent } from './other-permits.component';

describe('OtherPermitsComponent', () => {
  let component: OtherPermitsComponent;
  let fixture: ComponentFixture<OtherPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherPermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
