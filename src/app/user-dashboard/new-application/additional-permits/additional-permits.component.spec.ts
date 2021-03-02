import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalPermitsComponent } from './additional-permits.component';

describe('AdditionalPermitsComponent', () => {
  let component: AdditionalPermitsComponent;
  let fixture: ComponentFixture<AdditionalPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalPermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
