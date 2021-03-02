import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationsTableComponent } from './user-applications-table.component';

describe('UserApplicationsTableComponent', () => {
  let component: UserApplicationsTableComponent;
  let fixture: ComponentFixture<UserApplicationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplicationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApplicationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
