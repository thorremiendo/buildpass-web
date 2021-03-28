import { OnInit,Component, ViewChild, ElementRef } from '@angular/core';
import { messages, chatBotMessage } from '../../chat-box/chat-data-sample';


@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit {
 
  public userInfo;
  public sidePanelOpened = false;
  public selectedMessage: any;
  public msg = '';

  public talkWithChatbot:boolean = false;
  public isEnd:boolean = false;
  public isEvaluator = false;
 
  messages: Object[] = messages;

  constructor() {
      
      this.selectedMessage = chatBotMessage[0];
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

  chatbotMessage(question){
    console.log(question)

    switch(question){

      case"Apply":
      this.talkWithChatbot= true;
      setTimeout(
        () =>  this.selectedMessage.chat.push({
          type: 'incoming',
          msg: 'What type of permit do you intend to apply?',
          date: new Date()
       }),
        1000
      );

      setTimeout(
        () =>  this.selectedMessage.chat.push({
          type: 'outgoing',
          msg:"Building Permit",
          param:"Building",
       }),
      
        2000
      );
      setTimeout(
        () =>  this.selectedMessage.chat.push({
          type: 'outgoing',
          msg:"Occupancy Permit",
          param:"Residential",
       }),
      
        2000
      );
      setTimeout(
        () =>  this.selectedMessage.chat.push({
          type: 'outgoing',
          msg:"Other Permit",
          param:"Residential",
       }),
      
        2000
      );
     
     console.log(this.selectedMessage.chat);
       break;

       case"Building":
       this.talkWithChatbot= true;
       setTimeout(
         () =>  this.selectedMessage.chat.push({
           type: 'incoming',
           msg: "What type of structure do you intend to build?",
           date: new Date()
        }),
         1000
       );
       setTimeout(
         () =>  this.selectedMessage.chat.push({
          type: 'outgoing',
          msg:"Residential",
          param:"Residential",
        }),
         2000
       );
       setTimeout(
        () =>  this.selectedMessage.chat.push({
         type: 'outgoing',
         msg:"Commercial",
         param:"Residential",
       }),
        2000
      );
      setTimeout(
        () =>  this.selectedMessage.chat.push({
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
          () =>  this.selectedMessage.chat.push({
            type: 'incoming',
            msg: "Go to New Application - To start an application, click on New Application, then select the type of permit you are applying to and answer the following questions",
            date: new Date()
         }),
          1000
        );

        setTimeout(
          () =>  this.selectedMessage.chat.push({
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
        setTimeout(
          () =>  this.selectedMessage.chat.push({
            type: 'incoming',
            msg: "Please wait for a couple of minutes...",
            date: new Date()
         }),
          1000
        );

        setTimeout(
          () =>  this.selectedMessage.chat.push({
            type: 'outgoing',
            msg: "OK!",
            date: new Date()
         }),
          2000
        );
        //this.talkWithChatbot = false;
        console.log(this.selectedMessage)
         break;
  
 



    }
       
    

  }
}
