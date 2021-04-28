import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncementComponent } from './admin-announcement.component';

describe('AdminAnnouncementComponent', () => {
  let component: AdminAnnouncementComponent;
  let fixture: ComponentFixture<AdminAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
