import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() radius: string | number;

  get loaderRadius(): string {
    if(this.radius) return `${this.radius}px`;

    return '200px';
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
