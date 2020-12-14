import { 
  Component, 
  EventEmitter, 
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AdminUserParams, UserService } from 'src/app/core';

@Component({
  selector: 'app-admin-users-filters',
  templateUrl: './admin-users-filters.component.html',
  styleUrls: ['./admin-users-filters.component.scss']
})
export class AdminUsersFiltersComponent {

  public searchTerm: FormControl = new FormControl('');
  @Output() filterChanged: EventEmitter<AdminUserParams> = new EventEmitter();

  constructor(
    private userService: UserService,
  ) { 
    this.searchTerm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.emitChangeEvent();
    });
  }

  emitChangeEvent(): void {
    const event: AdminUserParams = {
      searchTerm: this.searchTerm.value,
    };

    this.filterChanged.emit(event);
  }

}
