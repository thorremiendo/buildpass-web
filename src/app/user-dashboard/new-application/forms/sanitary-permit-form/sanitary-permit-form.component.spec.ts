import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanitaryPermitFormComponent } from './sanitary-permit-form.component';

describe('SanitaryPermitFormComponent', () => {
  let component: SanitaryPermitFormComponent;
  let fixture: ComponentFixture<SanitaryPermitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanitaryPermitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanitaryPermitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
