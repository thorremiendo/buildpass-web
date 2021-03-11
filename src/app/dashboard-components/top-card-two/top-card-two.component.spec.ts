import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCardTwoComponent } from './top-card-two.component';

describe('TopCardTwoComponent', () => {
  let component: TopCardTwoComponent;
  let fixture: ComponentFixture<TopCardTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCardTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
