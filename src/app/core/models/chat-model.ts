export class SelectedMessageModel{
    constructor(
      public type: string,
      public msg: string,
      public currentTime: Date
    ) {
      this.type = type,
      this.msg = msg,
      this.currentTime = currentTime;
    }
  }
  