import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private modalService: ModalService) {}

  openLoginModal() {
    this.modalService.openModal('login');
  }

  openRegisterModal() {
    this.modalService.openModal('register');
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
