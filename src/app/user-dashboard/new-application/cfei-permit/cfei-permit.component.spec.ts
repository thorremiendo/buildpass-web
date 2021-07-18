import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfeiPermitComponent } from './cfei-permit.component';

describe('CfeiPermitComponent', () => {
  let component: CfeiPermitComponent;
  let fixture: ComponentFixture<CfeiPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfeiPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfeiPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
