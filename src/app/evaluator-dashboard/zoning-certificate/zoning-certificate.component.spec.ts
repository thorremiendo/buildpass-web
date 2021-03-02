import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoningCertificateComponent } from './zoning-certificate.component';

describe('ZoningCertificateComponent', () => {
  let component: ZoningCertificateComponent;
  let fixture: ComponentFixture<ZoningCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoningCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoningCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
