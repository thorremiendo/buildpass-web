import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationRouterComponent } from './new-application-router.component';

describe('NewApplicationRouterComponent', () => {
  let component: NewApplicationRouterComponent;
  let fixture: ComponentFixture<NewApplicationRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApplicationRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
