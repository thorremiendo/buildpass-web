import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqExpansionPanelComponent } from './faq-expansion-panel.component';

describe('FaqExpansionPanelComponent', () => {
  let component: FaqExpansionPanelComponent;
  let fixture: ComponentFixture<FaqExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
