import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './feed/feed.component';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { DashboardPusherComponent } from './dashboard-pusher/dashboard-pusher.component';
import { TestPusherRouting } from './test-pusher-routing.module';



@NgModule({
  declarations: [
    FeedComponent, 
    FeedFormComponent, 
    DashboardPusherComponent],

  imports: [
    CommonModule,
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TestPusherRouting,
  ]
})
export class TestPusherModule { }
