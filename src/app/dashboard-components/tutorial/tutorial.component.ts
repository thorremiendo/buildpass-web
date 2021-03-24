import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<
  MatCarouselSlideComponent>;

  slides = [
    {
      img: "https://ocpas-storage.s3-ap-southeast-1.amazonaws.com/guideline/1.png"
    },
    {
      img: "https://ocpas-storage.s3-ap-southeast-1.amazonaws.com/guideline/2.png"
    },
    {
      img: "https://ocpas-storage.s3-ap-southeast-1.amazonaws.com/guideline/3.png"
    },
    {
      img: "https://ocpas-storage.s3-ap-southeast-1.amazonaws.com/guideline/4.png"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
