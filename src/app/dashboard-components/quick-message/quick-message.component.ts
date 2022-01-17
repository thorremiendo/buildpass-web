import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChatService } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quick-message',
  templateUrl: './quick-message.component.html',
  styleUrls: ['./quick-message.component.scss']
})
export class QuickMessageComponent implements OnInit{


  sidePanelOpened = true;
  msg = '';
  public userInfo;
  private officeId: string | number;
  private evaluatorUserId: string | number;
  private chatId: number;
  private channel;

  private messageSubscription: Subscription;

  // MESSAGE
  selectedMessage: any;
  // tslint:disable-next-line - Disables all


  constructor(
    private chatService: ChatService,
    private dialogRef: MatDialogRef<QuickMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      dialogRef.disableClose = true;
      dialogRef.backdropClick().subscribe(() => {
        // Close the dialog
        this.chatService.unSubscribe(this.channel)
        console.log(this.channel, "unsubscribed")
        dialogRef.close( 
         );
      })
      this.selectedMessage = data;
      this.channel = this.selectedMessage.channel;
      this.chatId = this.selectedMessage.convo[0].chat_id;
      this.chatService.evaluatorChatSubscribe(this.channel);
      console.log(this.selectedMessage);
  
      // if (this.channel != newChannel) {
      //   this.channel = newChannel;
      //   this.chatService.unSubscribe(this.channel);
      //   this.chatService.evaluatorChatSubscribe(newChannel);
      // }
  }

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

    }
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef = Object.create(null);

  isOver(): boolean {
      return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  // onSelect(message: Object[]): void {
  //     this.selectedMessage = message;
  //     console.log(this.selectedMessage);
  
  // }

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

  // OnAddMsg(): void {
  //     this.msg = this.myInput.nativeElement.value;

  //     if (this.msg !== '') {
  //         this.selectedMessage.push({
  //             type: 'even',
  //             msg: this.msg,
  //             date: new Date()
  //         });
  //     }

  //     this.myInput.nativeElement.value = '';
  // }
