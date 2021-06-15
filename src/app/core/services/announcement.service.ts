
import { HttpParams } from '@angular/common/http';
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

  postAnnouncement(body){
    const url = `/announcement`;

    return this.api.post(url,body);
  }

  updateAnnouncementById(id, body){
    const url = `/announcement/${id}`;

    return this.api.post(url,body);
  
  }

  fetchAnnouncements(param?){
    const url = `/announcement`;
  
    return this.api.get(url,param);

  }

  fethAnnouncementById(id){
    const url = `/announcement/${id}`;

    return this.api.get(url);

  }

  removeAnnouncementById(id){
    const url = `/announcement/${id}`;

    return this.api.delete(url);
  } 

}