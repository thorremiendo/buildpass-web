import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfConstructionComponent } from './notice-of-construction.component';

describe('NoticeOfConstructionComponent', () => {
  let component: NoticeOfConstructionComponent;
  let fixture: ComponentFixture<NoticeOfConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
