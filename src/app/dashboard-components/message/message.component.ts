import { Component, OnInit, Input } from '@angular/core';
import { FeedService, ChatService } from '../../core';
import { Subscription } from 'rxjs';
import { messages } from './chat-data';
import { MatDialog } from '@angular/material/dialog';
import { QuickMessageComponent } from '../quick-message/quick-message.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() type = '';
  // private user;
  public messageNotif = messages;
  public show_message_notif: boolean;
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

  constructor(private chatService: ChatService, public chatDialog: MatDialog) {}

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user'));
    if (
      this.type == 'super admin' ||
      this.type == 'user' ||
      this.type == 'treasury'
    ) {
      this.show_message_notif = false;
    } else {
      if (localStorage.getItem('user') != null) {
        this.userInfo = JSON.parse(localStorage.getItem('user'));
        this.officeId = this.userInfo.employee_detail.office_id;
        this.evaluatorUserId = this.userInfo.id;

        // this.messageSubscription = this.chatService
        //   .getApplicantChatItems()
        //   .subscribe((data) => {
        //     console.log(data);
        //     this.selectedMessage.convo.push(data);
        //   });
        this.updateChatConvo();
      }
      // this.feedService.getNotifMessageTable().subscribe(data => {
      //   console.log(data.data);
      //   this.messageNotif = data.data;
      // });
    }
  }

  updateChatConvo(): void {
    console.log('open CHat');
    this.chatService
      .fetchConvo(this.officeId, 'reciever')
      .subscribe((result) => {
        this.messages = result.data;
        this.show_message_notif = true;
        console.log(this.messages)
        // console.log(this.messages);
        // if (this.messages != null) {
        //   this.selectedMessage = this.messages[0];
        //   if(this.selectedMessage){
        //     this.chatId = this.selectedMessage.convo[0].chat_id;
        //     this.channel = this.selectedMessage.channel;
        //     this.chatService.evaluatorChatSubscribe(this.channel);
        //   }
        // }
      });
  }
  openMessage(message): void {
    const dialogRef = this.chatDialog.open(QuickMessageComponent, {
      data: message,
      height: '800px',
      width: '500px',
      position: { right: '0' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.chatService.unSubscribe(this.channel);
      //console.log("unsubscribe");
    });
  }
}
