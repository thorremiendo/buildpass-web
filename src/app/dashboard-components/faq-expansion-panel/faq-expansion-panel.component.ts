import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-expansion-panel',
  templateUrl: './faq-expansion-panel.component.html',
  styleUrls: ['./faq-expansion-panel.component.scss']
})
export class FaqExpansionPanelComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
    
  }

}
