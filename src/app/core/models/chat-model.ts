export class SelectedMessageModel{
    constructor(
      public type: string,
      public message: string,
      public evaluator_name: string,
      public evaluator_display_role: string,
      public currentTime: Date,
     
    ) {
      this.type = type,
      this.message = message,
      this.evaluator_name = evaluator_name;
      this.evaluator_display_role = evaluator_display_role,
      this.currentTime = currentTime;
    }
  }
  