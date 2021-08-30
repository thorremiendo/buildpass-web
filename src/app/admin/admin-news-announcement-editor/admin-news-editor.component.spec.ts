import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsEditorComponent } from './admin-news-editor.component';

describe('AdminNewsEditorComponent', () => {
  let component: AdminNewsEditorComponent;
  let fixture: ComponentFixture<AdminNewsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
