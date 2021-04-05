import { OnInit,Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { messages, chatBotMessage } from '../../chat-box/chat-data-sample';
import { ChatService } from '../../../core';
import { tr } from 'date-fns/locale';


@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit {
 
  public userInfo;
  public sidePanelOpened = false;
  public selectedMessage: any;
  public msg:string = '';
  public chatId: number;

  public talkWithChatbot:boolean = false;
  public talkWithEvaluator:boolean = false;
  public conversations:boolean = false;
  public isEnd:boolean = false;
  public headerStart = true;
  public isEvaluator = false;

  public messages: [];
  private messageSubscription: Subscription;

  @ViewChild('myInput', { static: true }) myInput: ElementRef = Object.create(null);

  constructor(
    private chatService: ChatService,
  ) {
      
      //this.selectedMessage = chatBotMessage[0];
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));  
      this.chatService.applicantChatSubscribe();

      this.messageSubscription = this.chatService
      .getApplicantChatItems()
      .subscribe((data) => {
        this.selectedMessage.push(data);
        console.log("Message SUbs"+this.selectedMessage)
      });

      this.chatService.fetchConvo(this.userInfo.id).subscribe( (data) =>{
        console.log(data);
        this.messages = data.data;
        console.log("Fetch COnvo"+this.messages);
       // this.selectedMessage = this.messages[0];
      })
    }
   
  }

  

  isOver(): boolean {
      return window.matchMedia(`(max-width: 960px)`).matches;
  }

  backToConversations(){
    this.conversations = true;
    this.talkWithEvaluator =false;
  }

  

  // tslint:disable-next-line - Disables all
  onSelect(message): void {
      this.selectedMessage = message.convo;
      this.chatId = this.selectedMessage[0].chat_id;
      this.conversations = false;
      this.talkWithEvaluator = true;
  }

  OnCreateMsg(){
    const newConvo ={
      channel: `chat-${this.chatService.generateRandomNumber()}`,
      subject: 'Assistance',
      user_sender_id: 8,
      user_receiver_id:9,
      status_id: 1,
      type_id:1,
      message: "Good day, Can you assist me?",
      current_user_id:8,
    }

    console.log(newConvo);
    this.chatService.createConvo(newConvo);
  }

  OnAddMsg(): void {
      this.msg = this.myInput.nativeElement.value;

      if (this.msg !== '') {
        this.chatService.sendConvo(this.chatId, this.userInfo.id, this.msg)
          // this.selectedMessage.push({
          //   type: 'incoming',
          //   msg: this.msg,
          //   date: new Date()
             
          // });
      }

      this.myInput.nativeElement.value = '';
  }

  chatbotMessage(question){
    console.log(question)

    switch(question){

      case"Apply":
      this.talkWithChatbot= true;
      setTimeout(
        () =>  this.selectedMessage.push({
          type: 'incoming',
          msg: 'What type of permit do you intend to apply?',
          date: new Date()
       }),
        1000
      );

      setTimeout(
        () =>  this.selectedMessage.push({
          type: 'outgoing',
          msg:"Building Permit",
          param:"Building",
       }),
      
        2000
      );
      setTimeout(
        () =>  this.selectedMessage.push({
          type: 'outgoing',
          msg:"Occupancy Permit",
          param:"Residential",
       }),
      
        2000
      );
      setTimeout(
        () =>  this.selectedMessage.push({
          type: 'outgoing',
          msg:"Other Permit",
          param:"Residential",
       }),
      
        2000
      );
     
     console.log(this.selectedMessage);
       break;

       case"Building":
       this.talkWithChatbot= true;
       setTimeout(
         () =>  this.selectedMessage.push({
           type: 'incoming',
           msg: "What type of structure do you intend to build?",
           date: new Date()
        }),
         1000
       );
       setTimeout(
         () =>  this.selectedMessage.push({
          type: 'outgoing',
          msg:"Residential",
          param:"Residential",
        }),
         2000
       );
       setTimeout(
        () =>  this.selectedMessage.push({
         type: 'outgoing',
         msg:"Commercial",
         param:"Residential",
       }),
        2000
      );
      setTimeout(
        () =>  this.selectedMessage.push({
         type: 'outgoing',
         msg:"Institutional",
         param:"Residential",
       }),
        2000
      );
       console.log(this.selectedMessage)
        break;

        case"Residential":
        this.talkWithChatbot= true;
        setTimeout(
          () =>  this.selectedMessage.push({
            type: 'incoming',
            msg: "Go to New Application - To start an application, click on New Application, then select the type of permit you are applying to and answer the following questions",
            date: new Date()
         }),
          1000
        );

        setTimeout(
          () =>  this.selectedMessage.push({
            type: 'outgoing',
            msg: "Thank you",
            date: new Date()
         }),
          2000
        );
        //this.talkWithChatbot = false;
        console.log(this.selectedMessage)
         break;
  

        case"Evaluator":
        this.talkWithChatbot= true;
        this.headerStart = false;

        setTimeout(
          () =>  this.talkWithChatbot= false,500,
       this.talkWithEvaluator =true,500,
       this.selectedMessage = [],500,
       this.OnCreateMsg(),500
      

        );
        // setTimeout(
        //   () =>  this.selectedMessage.convo.push({
        //     type: 'incoming',
        //     msg: "Please wait for a couple of minutes...",
        //     currentTime: new Date()
        //  }),
        //   1000, 
        
        // );

        //this.talkWithChatbot = false;
       // console.log(this.selectedMessage)
        break;

        case"Conversations":
        this.talkWithChatbot = false;
        this.conversations = true;
        this.headerStart = false;

         break;
  
 



    }
       
    

  }
}
