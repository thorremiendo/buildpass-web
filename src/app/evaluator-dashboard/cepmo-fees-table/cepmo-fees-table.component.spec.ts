import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepmoFeesTableComponent } from './cepmo-fees-table.component';

describe('CepmoFeesTableComponent', () => {
  let component: CepmoFeesTableComponent;
  let fixture: ComponentFixture<CepmoFeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CepmoFeesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepmoFeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
