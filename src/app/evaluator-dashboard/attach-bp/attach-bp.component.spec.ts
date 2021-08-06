import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachBpComponent } from './attach-bp.component';

describe('AttachBpComponent', () => {
  let component: AttachBpComponent;
  let fixture: ComponentFixture<AttachBpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachBpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
