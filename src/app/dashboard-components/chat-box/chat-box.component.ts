import { OnInit,Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/core';
import { messages } from './chat-data-sample';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public userInfo;
  private officeId:string | number;
  private chatId:number;
  private channel;
  private 

  sidePanelOpened = true;
  msg = '';

  // MESSAGE
  selectedMessage:any;
  // tslint:disable-next-line - Disables all
  messages: Object[];
  //messages: Object[] = messages;

  private messageSubscription: Subscription;
  constructor(
    private chatService: ChatService,
  ) {
     
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this.officeId = this.userInfo.employee_detail.office_id;
      

     
      this.messageSubscription = this.chatService
      .getApplicantChatItems()
      .subscribe((data) => {
        this.selectedMessage.convo.push(data);
        console.log(this.selectedMessage)
      });

      this.chatService.fetchConvo(this.officeId, 'reciever').subscribe(result =>{
        console.log(result);
        this.messages = result.data;
        if(this.messages != null){
          this.selectedMessage = this.messages[0];
          this.chatId = this.selectedMessage.convo[0].chat_id;
          this.channel = this.selectedMessage.channel;
          this.chatService.evaluatorChatSubscribe(this.channel);
        }
       
      })
    }
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef = Object.create(null);

  isOver(): boolean {
      return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message): void {
  
    let newChannel = message.channel;
    this.selectedMessage = message;
    this.chatId = this.selectedMessage.convo[0].chat_id;

    if(this.channel != newChannel ){
      console.log("Current: "+this.channel+" New: "+newChannel+" Not Equal")
      this.channel = newChannel;
      this.chatService.unSubscribe(this.channel);
      this.chatService.evaluatorChatSubscribe(newChannel);
    }
   
   
  }

  OnAddMsg(): void {
    this.msg = this.myInput.nativeElement.value;

    if (this.msg !== '') {
      this.chatService.sendConvo(this.chatId, this.userInfo.id, this.msg)
    }

    this.myInput.nativeElement.value = '';
}

}
