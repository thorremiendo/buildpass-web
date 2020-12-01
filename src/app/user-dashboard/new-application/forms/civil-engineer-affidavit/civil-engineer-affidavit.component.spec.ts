import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilEngineerAffidavitComponent } from './civil-engineer-affidavit.component';

describe('CivilEngineerAffidavitComponent', () => {
  let component: CivilEngineerAffidavitComponent;
  let fixture: ComponentFixture<CivilEngineerAffidavitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilEngineerAffidavitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilEngineerAffidavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
