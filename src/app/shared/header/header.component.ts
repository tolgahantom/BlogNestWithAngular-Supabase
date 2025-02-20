import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser$: Observable<UserModel | null>;
  isUserModalOpen: boolean = false;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  openLoginModal() {
    this.modalService.openModal('login');
  }

  openRegisterModal() {
    this.modalService.openModal('register');
  }

  closeModal() {
    this.modalService.closeModal();
  }

  logout() {
    this.authService.logout();
  }
}
