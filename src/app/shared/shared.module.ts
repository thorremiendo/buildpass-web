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

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
  ],
  providers: [MenuItems],
})
export class SharedModule {}
