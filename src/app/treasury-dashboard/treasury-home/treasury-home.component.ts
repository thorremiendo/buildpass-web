import { TreasuryService } from './../treasury-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treasury-home',
  templateUrl: './treasury-home.component.html',
  styleUrls: ['./treasury-home.component.scss'],
})
export class TreasuryHomeComponent implements OnInit {
  constructor(private treasuryService: TreasuryService) {}

  ngOnInit(): void {}
}
