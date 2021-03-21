import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FencingPermitComponent } from './fencing-permit.component';

describe('FencingPermitComponent', () => {
  let component: FencingPermitComponent;
  let fixture: ComponentFixture<FencingPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FencingPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FencingPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
