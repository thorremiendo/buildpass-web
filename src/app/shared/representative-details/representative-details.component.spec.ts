import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeDetailsComponent } from './representative-details.component';

describe('RepresentativeDetailsComponent', () => {
  let component: RepresentativeDetailsComponent;
  let fixture: ComponentFixture<RepresentativeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
