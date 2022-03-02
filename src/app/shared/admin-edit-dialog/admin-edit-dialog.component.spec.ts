import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditDialogComponent } from './admin-edit-dialog.component';

describe('AdminEditDialogComponent', () => {
  let component: AdminEditDialogComponent;
  let fixture: ComponentFixture<AdminEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
