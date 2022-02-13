import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDocsComponent } from './application-docs.component';

describe('ApplicationDocsComponent', () => {
  let component: ApplicationDocsComponent;
  let fixture: ComponentFixture<ApplicationDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
