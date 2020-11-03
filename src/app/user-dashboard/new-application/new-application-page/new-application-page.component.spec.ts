import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationPageComponent } from './new-application-page.component';

describe('NewApplicationPageComponent', () => {
  let component: NewApplicationPageComponent;
  let fixture: ComponentFixture<NewApplicationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApplicationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
