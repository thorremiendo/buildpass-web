import { OnInit,Component, ViewChild, ElementRef } from '@angular/core';
import { messages } from './chat-data-sample';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public userInfo;

  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;
  // tslint:disable-next-line - Disables all
  messages: Object[] = messages;

  constructor() {
      this.selectedMessage = this.messages[0];
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
    }

  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef = Object.create(null);

  isOver(): boolean {
      return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message: Object[]): void {
      this.selectedMessage = message;
  }

  OnAddMsg(): void {
      this.msg = this.myInput.nativeElement.value;

      if (this.msg !== '') {
          this.selectedMessage.chat.push({
              type: 'outgoing',
              msg: this.msg,
              date: new Date()
          });
      }

      this.myInput.nativeElement.value = '';
  }

}
