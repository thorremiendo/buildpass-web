import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInUpPageComponent } from './sign-in-up-page.component';

describe('SignInUpPageComponent', () => {
  let component: SignInUpPageComponent;
  let fixture: ComponentFixture<SignInUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInUpPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
