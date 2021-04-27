
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: "root",
})

export class AdminFeedBackService  {
  constructor(

    private api:ApiService,
  
  ) {}

  fetchAllFeedBack(){
    const url = `/feedback`;

    return this.api.get(url);
  }

  fetchFeedBackFilter(category){
    const url = `/feedback/${category}`;

    return this.api.get(url);
  }

  }