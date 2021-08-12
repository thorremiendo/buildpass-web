import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPermitNumberComponent } from './input-permit-number.component';

describe('InputPermitNumberComponent', () => {
  let component: InputPermitNumberComponent;
  let fixture: ComponentFixture<InputPermitNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPermitNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPermitNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
