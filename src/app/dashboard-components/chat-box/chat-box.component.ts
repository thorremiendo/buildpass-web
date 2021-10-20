import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/core';
import { messages } from './chat-data-sample';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  public userInfo;
  private officeId: string | number;
  private evaluatorUserId: string | number;
  private chatId: number;
  private channel;
  private;

  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage: any;
  // tslint:disable-next-line - Disables all
  messages: Object[];
  //messages: Object[] = messages;

  private messageSubscription: Subscription;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this.officeId = this.userInfo.employee_detail.office_id;
      this.evaluatorUserId = this.userInfo.id;

      this.messageSubscription = this.chatService
        .getApplicantChatItems()
        .subscribe((data) => {
          console.log(data);
          this.selectedMessage.convo.push(data);
        });

      this.chatService
        .fetchConvo(this.officeId, 'reciever')
        .subscribe((result) => {
          this.messages = result.data;
          console.log(this.messages);
          if (this.messages != null) {
            this.selectedMessage = this.messages[0];
            if(this.selectedMessage){
              this.chatId = this.selectedMessage.convo[0].chat_id;
              this.channel = this.selectedMessage.channel;
              this.chatService.evaluatorChatSubscribe(this.channel);
            }
         
          }
        });
    }
  }

  // @ViewChild('myInput', { static: true }) myInput: ElementRef = Object.create(
  //   null
  // );

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message): void {
    let newChannel = message.channel;
    this.selectedMessage = message;
    this.chatId = this.selectedMessage.convo[0].chat_id;
    console.log(this.selectedMessage);

    if (this.channel != newChannel) {
      this.channel = newChannel;
      this.chatService.unSubscribe(this.channel);
      this.chatService.evaluatorChatSubscribe(newChannel);
    }
  }

  OnAddMsg(): void {
   
    if (this.msg !== '') {

      var body = {
          chat_id: this.chatId,
          current_user_id: this.userInfo.id,
          current_evaluator_id: this.evaluatorUserId,
          message: this.msg,
        };
        
      }
      this.chatService.sendConvo(body);
      this.msg = '';
    }
  }

