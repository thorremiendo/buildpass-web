import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedTasksComponent } from './closed-tasks.component';

describe('ClosedTasksComponent', () => {
  let component: ClosedTasksComponent;
  let fixture: ComponentFixture<ClosedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
