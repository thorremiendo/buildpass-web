import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NewApplicationService {
  constructor(private api: ApiService) {}

  submitApplication(body) {
    const url = `/application`;

    return this.api.post(url, body);
  }

  submitDocument(body) {
    const url = `/userdocs`;

    return this.api.post(url, body);
  }
}
