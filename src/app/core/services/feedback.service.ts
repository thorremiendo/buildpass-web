import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
    constructor(
        private api: ApiService
    ) {}

    fetchFeedbacks() {
        const url = `/feedback`;
        return this.api.get(url);
    }

    submitFeedback(data) {
        const url = `/feedback`;
        return this.api.post(url, data);
    }
}