
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: "root",
})

export class AnnouncementService  {
  constructor(

    private api:ApiService,
  
  ) {}

  postAnnouncements(body){
    const url = `/announcement`;

    return this.api.get(url,body);
  }

  fetchApplicationbyId(id){
      const url = `/application/${id}`;

      return this.api.get(url);
    
  }

}