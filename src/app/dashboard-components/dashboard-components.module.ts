import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopCardComponent } from './top-card/top-card.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { TopCardTwoComponent } from './top-card-two/top-card-two.component';
import { NotificationComponent } from './notification/notification.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatModule } from './chat/chat.module';
import { RemindersComponent } from './reminders/reminders.component';
import { FaqExpansionPanelComponent } from './faq-expansion-panel/faq-expansion-panel.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    TopCardComponent,
    BarChartComponent,
    DonutChartComponent,
    TopCardTwoComponent,
    NotificationComponent,
    ChatBoxComponent,
    RemindersComponent,
    FaqExpansionPanelComponent,
    TutorialComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatCardModule,
    MaterialModule,
    MatCarouselModule.forRoot(),

    FlexLayoutModule,

    NgApexchartsModule,
    PerfectScrollbarModule,
    ChatModule,
  ],

  exports: [
    TopCardComponent,
    BarChartComponent,
    DonutChartComponent,
    TopCardTwoComponent,
    NotificationComponent,
    ChatBoxComponent,
    RemindersComponent,
    FaqExpansionPanelComponent,
    TutorialComponent,
    ChatModule,
  ],

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class DashboardComponentsModule {}
