import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [FeedService],
})
export class FeedComponent implements OnInit, OnDestroy {
  public feeds: Feed[] = [];

  private feedSubscription: Subscription;

  constructor(private feedService: FeedService) {
    this.feedSubscription = feedService
      .getFeedItems()
      .subscribe((feed: Feed) => {
        this.feeds.push(feed);
        console.log(feed);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }
}
