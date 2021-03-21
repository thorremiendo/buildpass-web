import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatButtonComponent } from './chat-button.component';

describe('ChatComponent', () => {
  let component: ChatButtonComponent;
  let fixture: ComponentFixture<ChatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
