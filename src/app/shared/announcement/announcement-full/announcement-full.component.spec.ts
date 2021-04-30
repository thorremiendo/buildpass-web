import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementFullComponent } from './announcement-full.component';

describe('AnnouncementFullComponent', () => {
  let component: AnnouncementFullComponent;
  let fixture: ComponentFixture<AnnouncementFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
