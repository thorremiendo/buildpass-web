import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../core';
@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.scss']
})
export class ChatButtonComponent implements OnInit {
  public hidden = false;
  public unseen: number;

  constructor(
    private feedService: FeedService,
  ) { }

  ngOnInit(): void {
    this.feedService.checkUser();
    this.feedService.getTotalUnseenChat().subscribe( data => {
      this.unseen = data.data;
    })

    if(this.unseen == 0){
      this.hidden = true;
    }
  }

  toggleBadgeVisibility() {
    this.hidden = true;
    if(this.unseen == 0){
      this.hidden = true;
    }

   
  }

}
