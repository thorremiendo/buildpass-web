import { Component, OnInit } from '@angular/core';

import { MessagingService } from './../core/services/messaging.service';
@Component({
  selector: 'app-test-notification',
  templateUrl: './test-notification.component.html',
  styleUrls: ['./test-notification.component.scss']
})
export class TestNotificationComponent implements OnInit {
  title = 'push-notification';
  public message;
  public notifbox =[];

  constructor(
    private _messagingService: MessagingService,
  ) { 
    
  }

  ngOnInit(): void {
    
    this._messagingService.requestPermission()
    this._messagingService.receiveMessage()
    this.message = this._messagingService.currentMessage;
    this.notifbox = this._messagingService.notifBox;
    console.log(this.notifbox);
    
    console.log(this.message);
  }

}
