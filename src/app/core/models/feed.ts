export class Feed {
    constructor(
      public application_number: string,
      public status: string,
      public message: string,
    ) {
      this.application_number = application_number;
      this.status = status;
      this.message = message;
    }
  }
  