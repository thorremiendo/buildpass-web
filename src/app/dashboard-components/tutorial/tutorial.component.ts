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
      img: "../../../../assets/illustrations/tutorials/1.png"
    },
    {
      img: "../../../../assets/illustrations/tutorials/2.png"
    },
    {
      img: "../../../../assets/illustrations/tutorials/3.png"
    },
    {
      img: "../../../../assets/illustrations/tutorials/4.png"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
