import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WwwmsCertificateComponent } from './wwwms-certificate.component';

describe('WwwmsCertificateComponent', () => {
  let component: WwwmsCertificateComponent;
  let fixture: ComponentFixture<WwwmsCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WwwmsCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WwwmsCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
