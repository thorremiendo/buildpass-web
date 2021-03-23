import { MaterialModule } from './../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { FormsModule } from '@angular/forms';
import { MenuItems } from './menu-items/menu-items';
import { LoaderComponent } from './loader/loader.component';
import { DateAgoPipe } from '../core';
import { ApplicationTimelineComponent } from './application-timeline/application-timeline.component';
import { ApplicationFeesSummaryComponent } from './application-fees-summary/application-fees-summary.component';
import { RepresentativeDetailsComponent } from './representative-details/representative-details.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
    RepresentativeDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule, 
    MaterialModule,
    PerfectScrollbarModule,
  ],
  
  exports: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
    RepresentativeDetailsComponent,
   
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  MenuItems],
})
export class SharedModule {}
