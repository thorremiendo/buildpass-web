import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporarySidewalkComponent } from './temporary-sidewalk.component';

describe('TemporarySidewalkComponent', () => {
  let component: TemporarySidewalkComponent;
  let fixture: ComponentFixture<TemporarySidewalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporarySidewalkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporarySidewalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
