import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() type = '';
  private user;
  public show_message_notif:boolean;
  
  mymessages = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'CBAO',
      subject: 'Anya ngay jay application mo',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'CBAO',
      subject: 'Anya ngay jay application mo',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/3.jpg',
      status: 'away',
      from: 'BFP',
      subject: 'Fire extinguisher',
      time: '9:08 AM'
    },
   
  ];

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.type == 'super admin') {
      this.show_message_notif = false;
    }  //else {
    
     
    // }
  }

}
