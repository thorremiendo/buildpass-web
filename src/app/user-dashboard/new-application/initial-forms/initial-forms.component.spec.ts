import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFormsComponent } from './initial-forms.component';

describe('InitialFormsComponent', () => {
  let component: InitialFormsComponent;
  let fixture: ComponentFixture<InitialFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
