import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../../core';
import { messages } from "./chat-data"
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

  mymessages = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Jose Garcia',
      subject: 'Application APN 1234252234',
      time: '9:30 AM',
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Jose Garcia',
      subject: 'Anya ngay jay application ko',
      time: '9:10 AM',
    },
    {
      useravatar: 'assets/images/users/3.jpg',
      status: 'away',
      from: 'Jose Garcia',
      subject: 'Fire extinguisher',
      time: '9:08 AM',
    },
  ];

  constructor(
    private feedService: FeedService,
    public chatDialog: MatDialog
    ) {
 
  }

  ngOnInit(): void {

    // this.user = JSON.parse(localStorage.getItem('user'));
    if (this.type == 'super admin' || this.type == "user") {
      this.show_message_notif = false;
    } else {
      console.log(this.type);
      this.show_message_notif = true;
      // this.feedService.getNotifMessageTable().subscribe(data => {
      //   console.log(data.data);
      //   this.messageNotif = data.data;
      // });
    }
  }

  openMessage(chat){
    const dialogRef = this.chatDialog.open(QuickMessageComponent,{
      data: chat,
      height: "800px",
      // width: "500px",
      position: { right: '0'}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log(chat);
  }
}
