import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignAnalysisFormsComponent } from './design-analysis-forms.component';

describe('DesignAnalysisFormsComponent', () => {
  let component: DesignAnalysisFormsComponent;
  let fixture: ComponentFixture<DesignAnalysisFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignAnalysisFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignAnalysisFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
