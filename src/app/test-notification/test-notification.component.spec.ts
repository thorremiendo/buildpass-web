import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNotificationComponent } from './test-notification.component';

describe('TestNotificationComponent', () => {
  let component: TestNotificationComponent;
  let fixture: ComponentFixture<TestNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
