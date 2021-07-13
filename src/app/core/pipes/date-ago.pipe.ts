import {
  Pipe,
  PipeTransform,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, Observer, interval } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Pipe({
  name: 'dateAgo',
  pure: false,
})
export class DateAgoPipe implements PipeTransform, OnDestroy {
  private subscription: any;
  private cachedResult: string = null;
  private cachedInputDate: Date;

  constructor(private _ref: ChangeDetectorRef) {}

  transform(inputDate: Date, args?: any): any {
    if (inputDate !== this.cachedInputDate) {
      this.cachedResult = null;
      this.cachedInputDate = inputDate;

      this.subscription = interval(1000)
        .pipe(
          map(() => {
            return this.countResult(
              Math.abs(new Date().getTime() - new Date(inputDate).getTime()) /
                1000
            );
          }),
          distinctUntilChanged()
        )
        .subscribe((value) => {
          this.cachedResult = value;
          this._ref.markForCheck();
        });
    }

    return this.cachedResult;
  }

  countResult(delta: number) {
    let result: string;
    if (delta < 10) {
      result = 'Just Now';
    } else if (delta < 3600) {
      // sent in last hour
      result = Math.floor(delta / 60) + ' min ago';
    } else if (delta < 86400) {
      // sent on last day
      result = Math.floor(delta / 3600) + ' hr ago';
    } else {
      // sent more than one day ago
      result = Math.floor(delta / 86400) + ' day ago';
    }

    return result;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
