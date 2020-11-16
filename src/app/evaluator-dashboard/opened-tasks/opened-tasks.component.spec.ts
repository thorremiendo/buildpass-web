import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedTasksComponent } from './opened-tasks.component';

describe('OpenedTasksComponent', () => {
  let component: OpenedTasksComponent;
  let fixture: ComponentFixture<OpenedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
