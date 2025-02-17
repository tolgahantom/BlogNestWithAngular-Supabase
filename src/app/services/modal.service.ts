import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  private modeSubject = new BehaviorSubject<'login' | 'register'>('login');
  mode$ = this.modeSubject.asObservable();

  openModal(mode: 'login' | 'register') {
    this.modeSubject.next(mode);
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
  }

  setMode(mode: 'login' | 'register') {
    this.modeSubject.next(mode);
  }
}
