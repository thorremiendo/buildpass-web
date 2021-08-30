import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsigPromptComponent } from './esig-prompt.component';

describe('EsigPromptComponent', () => {
  let component: EsigPromptComponent;
  let fixture: ComponentFixture<EsigPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsigPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsigPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
