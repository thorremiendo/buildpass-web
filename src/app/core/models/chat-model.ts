export class SelectedMessageModel{
    constructor(
      public type: string,
      public message: string,
      public currentTime: Date
    ) {
      this.type = type,
      this.message = message,
      this.currentTime = currentTime;
    }
  }
  