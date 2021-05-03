import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationListComponent } from './admin-application-list.component';

describe('ApplicationListComponent', () => {
  let component: AdminApplicationListComponent;
  let fixture: ComponentFixture<AdminApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApplicationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
