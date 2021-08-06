import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateOldBpComponent } from './associate-old-bp.component';

describe('AssociateOldBpComponent', () => {
  let component: AssociateOldBpComponent;
  let fixture: ComponentFixture<AssociateOldBpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateOldBpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateOldBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
