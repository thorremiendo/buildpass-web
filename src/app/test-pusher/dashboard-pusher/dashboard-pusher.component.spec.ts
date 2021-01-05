import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPusherComponent } from './dashboard-pusher.component';

describe('DashboardPusherComponent', () => {
  let component: DashboardPusherComponent;
  let fixture: ComponentFixture<DashboardPusherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPusherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPusherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
