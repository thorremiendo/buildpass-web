export class Feed {
    constructor(
      public application_id: number,
      public application_number: string,
      public status: string,
      public message: string,
      public currentTime: Date
    ) {
      this.application_id = application_id,
      this.application_number = application_number;
      this.status = status;
      this.message = message;
      this.currentTime = currentTime;
    }
  }
  