import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyUploadFileComponent } from './occupancy-upload-file.component';

describe('OccupancyUploadFileComponent', () => {
  let component: OccupancyUploadFileComponent;
  let fixture: ComponentFixture<OccupancyUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyUploadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
