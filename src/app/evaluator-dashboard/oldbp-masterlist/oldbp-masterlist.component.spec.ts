import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldbpMasterlistComponent } from './oldbp-masterlist.component';

describe('OldbpMasterlistComponent', () => {
  let component: OldbpMasterlistComponent;
  let fixture: ComponentFixture<OldbpMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldbpMasterlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldbpMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
