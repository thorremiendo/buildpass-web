import { OccupancyService } from './../../core/services/occupancy.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occupancy-requests',
  templateUrl: './occupancy-requests.component.html',
  styleUrls: ['./occupancy-requests.component.scss'],
})
export class OccupancyRequestsComponent implements OnInit {
  dataSource = [
    {
      user_id: '423',
      name: 'Allan Abuan',
      contact: '09123456789',
      email: 'allan_abuan@gmail.com',
      notes: 'Project location po is sa Lucnab',
    },
  ];
  columnsToDisplay: string[] = ['id', 'name', 'contact', 'email', 'notes'];

  constructor(private occupancyService: OccupancyService) {}

  ngOnInit(): void {}
}
