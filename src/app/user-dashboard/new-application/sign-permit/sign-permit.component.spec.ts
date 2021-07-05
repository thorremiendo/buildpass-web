import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPermitComponent } from './sign-permit.component';

describe('SignPermitComponent', () => {
  let component: SignPermitComponent;
  let fixture: ComponentFixture<SignPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
