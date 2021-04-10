import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-card-two',
  templateUrl: './top-card-two.component.html',
  styleUrls: ['./top-card-two.component.scss']
})
export class TopCardTwoComponent implements OnInit {
  @Input() public application: string | number;
  @Input() public pending: string | number;
  @Input() public current: string | number;
  @Input() public completed: string | number;

  constructor() { }

  ngOnInit(): void {
  }

}
