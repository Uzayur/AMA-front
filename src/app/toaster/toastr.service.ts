import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(private toastr: Toastr) {}

  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string): void {
    this.toastr.error(message, title);
  }
}
