import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryFormsComponent } from './accessory-forms.component';

describe('AccessoryFormsComponent', () => {
  let component: AccessoryFormsComponent;
  let fixture: ComponentFixture<AccessoryFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
