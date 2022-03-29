import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepmoCertificateComponent } from './cepmo-certificate.component';

describe('CepmoCertificateComponent', () => {
  let component: CepmoCertificateComponent;
  let fixture: ComponentFixture<CepmoCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CepmoCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepmoCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
