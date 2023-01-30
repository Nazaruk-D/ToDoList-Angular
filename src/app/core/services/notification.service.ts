import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Notify} from "../models/notify.models";

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<Notify | null>(null)

  handleError(message: string) {
    this.notify$.next({severity: 'error', message})
    setTimeout(()=>{
      this.clear()
    }, 5000)
  }

  handleSuccess(message: string) {
    this.notify$.next({severity: 'success', message})
    setTimeout(()=>{
      this.clear()
    }, 5000)
  }

  clear() {
    this.notify$.next(null)
  }
}
