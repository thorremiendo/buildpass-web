import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPromptComponent } from './password-prompt.component';

describe('PasswordPromptComponent', () => {
  let component: PasswordPromptComponent;
  let fixture: ComponentFixture<PasswordPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
