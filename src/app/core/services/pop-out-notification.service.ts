import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PopOutNotificationsService {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  openSuccess(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  openInfoToast(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: 'info',
      title: message,
    });
  }

  openSuccessToast(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
}
