import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsicUploadComponent } from './fsic-upload.component';

describe('FsicUploadComponent', () => {
  let component: FsicUploadComponent;
  let fixture: ComponentFixture<FsicUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsicUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FsicUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
