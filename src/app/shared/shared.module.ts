import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { SummaryFormsListComponent } from './summary-forms-list/summary-forms-list.component';
import { ApplicationSummaryComponent } from './application-summary/application-summary.component';

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
    SummaryFormsListComponent,
    ApplicationSummaryComponent,
  ],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
    RepresentativeDetailsComponent,
    SummaryFormsListComponent,
    ApplicationSummaryComponent,
  ],
  providers: [MenuItems, { provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class SharedModule {}
