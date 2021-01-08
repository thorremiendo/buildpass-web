import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeesComponent } from './view-fees.component';

describe('ViewFeesComponent', () => {
  let component: ViewFeesComponent;
  let fixture: ComponentFixture<ViewFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
