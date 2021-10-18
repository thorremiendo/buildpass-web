import {
  OnInit,
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { messages, chatBotMessage } from '../../chat-box/chat-data-sample';
import { ChatService } from '../../../core';
import { tr } from 'date-fns/locale';
import da from 'date-fns/locale/da';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss'],
})
export class ChatBodyComponent implements OnInit {
  public userInfo;
  public sidePanelOpened = false;
  public selectedMessage: any;
  public msg: string = '';
  public chatId: number;
  private channel: string;
  private currentDay = new Date().getDay();
  example: string = `<div>this is another div <br/> i want to insert dynamically</div>`

  public talkWithChatbot: boolean = false;
  public talkWithEvaluator: boolean = false;
  public showContacts: boolean = false;
  public selectingOffice: boolean = false;
  public isEnd: boolean = false;
  public hasMessage: boolean = false;
  public headerStart: boolean= true;
  public isEvaluator: boolean = false;

  //private officeArray:Array<string>= ["CBAO", "CPDO", "BFP", "CEPMO"];
  public officeArray:Array<object> = [
    {id: 1, text: 'CPDO',},
    {id: 2, text: 'CEPMO'},
    {id: 3, text: 'BFP'},
    {id: 4, text: 'CBAO'},
];

  public messages: [];
  private messageSubscription: Subscription;

  // @ViewChild('myInput', { static: true }) myInput: ElementRef =
  //   Object.create(null);

  constructor(
    private chatService: ChatService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkDate();
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));

      this.messageSubscription = this.chatService
        .getApplicantChatItems()
        .subscribe((data) => {
          console.log(data);
          this.selectedMessage.push(data);
        });

      this.chatService
        .fetchConvo(this.userInfo.id, 'sender')
        .subscribe((data) => {
          console.log(data);
          this.messages = data.data;

          if (this.messages.length != 0) {
            this.hasMessage = true;
          }
        });
    }
  }

  mainChat() {
    this.hasMessage = true;
    this.showContacts = false;
    this.talkWithEvaluator = false;
    this.talkWithChatbot = false;
    this.headerStart = true;
    this.selectedMessage = [];
    this.chatService.unSubscribe(this.channel);
  }

  onSelect(message): void {
    this.channel = message.channel;
    this.chatService.applicantChatSubscribe(this.channel);
    this.selectedMessage = message.convo;
    this.chatId = this.selectedMessage[0].chat_id;
    this.chatService.isViewed(this.chatId);
    this.showContacts = false;
    this.talkWithEvaluator = true;
  }

  OnCreateMsg(office_id) {
    console.log(office_id);
    let channel = `chat-${this.chatService.generateRandomNumber()}`;
    const newConvo = {
      channel: channel,
      subject: 'Assistance',
      user_sender_id: this.userInfo.id,
      user_receiver_id: 0,
      office_receiver_id: office_id,
      status_id: 1,
      type_id: 1,
      message: 'Good day, Can you assist me?',
      current_user_id: this.userInfo.id,
    };

    this.chatService.applicantChatSubscribe(channel);
    this.chatService.createConvo(newConvo).subscribe((data) => {
      this.chatId = data.data;

    //   setTimeout(
    //     () =>
    //       this.selectedMessage.push({
    //         type: 'incoming',
    //         message: 'Whom to you want to talk with?',
    //         date: new Date(),
    //       }),
    //     1000
    //   );
  
  
    //   setTimeout(
    //     () =>
    //       this.selectedMessage.push({
    //         type: 'incoming',
    //         message: 'CBAO',
    //         param: 'Building',
    //         element: 'Button'
    //       }),
    //     2000
    //   );
    //   setTimeout(
    //     () =>
    //       this.selectedMessage.push({
    //         type: 'incoming',
    //         message: 'CPDO',
    //         param: 'Building',
    //         element: 'Button'
    //       }),
    //     2000
    //   );
    //   setTimeout(
    //     () =>
    //       this.selectedMessage.push({
    //         type: 'incoming',
    //         message: 'BFP',
    //         param: 'Building',
    //         element: 'Button'
    //       }),
    //     2000
    //   );
  
    //   setTimeout(
    //     () =>
    //       this.selectedMessage.push({
    //         type: 'incoming',
    //         message: 'CEPMO',
    //         param: 'Building',
    //         element: 'Button'
    //       }),
    //     2000
    //   );
    });

   

    //console.log(this.selectedMessage)

  }

  OnAddMsg(): void {
    //this.msg = this.myInput.nativeElement.value;

    if (this.msg !== '') {

      var body = {
          chat_id: this.chatId,
          current_user_id: this.userInfo.id,
          current_evaluator_id: 0,
          message: this.msg,
        };
        
      }
      this.msg = '';
    }

  

  checkDate() {
    if (this.currentDay == 6 || this.currentDay == 7) {
    } else {
    }
  }

  chatbotMessage(question, office_id?) {
    console.log(office_id);
    switch (question) {
      case 'Apply':
        this.talkWithChatbot = true;
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'incoming',
              msg: 'What type of permit do you intend to apply?',
              date: new Date(),
            }),
          1000
        );

        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Building Permit',
              param: 'Building',
            }),

          2000
        );
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Occupancy Permit',
              param: 'Residential',
            }),

          2000
        );
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Other Permit',
              param: 'Residential',
            }),

          2000
        );

        break;

      case 'Building':
        this.talkWithChatbot = true;
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'incoming',
              msg: 'What type of structure do you intend to build?',
              date: new Date(),
            }),
          1000
        );
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Residential',
              param: 'Residential',
            }),
          2000
        );
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Commercial',
              param: 'Residential',
            }),
          2000
        );
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Institutional',
              param: 'Residential',
            }),
          2000
        );
        break;

      case 'Residential':
        this.talkWithChatbot = true;
        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'incoming',
              msg: 'Go to New Application - To start an application, click on New Application, then select the type of permit you are applying to and answer the following questions',
              date: new Date(),
            }),
          1000
        );

        setTimeout(
          () =>
            this.selectedMessage.push({
              type: 'outgoing',
              msg: 'Thank you',
              date: new Date(),
            }),
          2000
        );
        //this.talkWithChatbot = false;
        break;

      case 'Select Office':
        this.talkWithChatbot = true;
        this.headerStart = false;

        setTimeout(
          () => (this.talkWithChatbot = false),
          500,
          (this.selectingOffice = true),
          500,
          (this.selectedMessage = []),
          500,
          //this.OnCreateMsg(),
          500
        );
        break;

        case 'Evaluator':
          this.talkWithChatbot = true;
          this.headerStart = false;
  
          setTimeout(
            () => (this.talkWithChatbot = false),
            100,
            (this.selectingOffice = false),
            100,
            (this.talkWithEvaluator = true),
            100,
            (this.selectedMessage = []),
            100,
            this.OnCreateMsg(office_id),
            100
          );
          break;

      case 'Show Contacts':
        this.talkWithChatbot = false;
        this.talkWithEvaluator = false;
        this.showContacts = true;
        this.headerStart = false;
        this.chatService
          .fetchConvo(this.userInfo.id, 'sender')
          .subscribe((data) => {
            this.messages = data.data;
            // this.selectedMessage = this.messages[0];
          });

        break;
    }
  }
}
