import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    public modalService: ModalService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      usernameRG: ['', Validators.required],
      emailRG: ['', [Validators.required, Validators.email]],
      passwordRG: ['', [Validators.required]],
    });
    this.loginForm = this.fb.group({
      emailLG: ['', [Validators.required, Validators.email]],
      passwordLG: ['', Validators.required],
    });
  }

  setMode(mode: 'login' | 'register') {
    this.modalService.setMode(mode);
  }

  onRegister = async () => {
    if (this.registerForm.valid) {
      try {
        const user = await this.authService
          .register(
            this.registerForm.value.usernameRG,
            this.registerForm.value.emailRG,
            this.registerForm.value.passwordRG
          )
          .then((user) => this.modalService.closeModal())
          .catch((error) => console.log('hata', error));
      } catch (error) {
        console.error('Kayıt başarısız:', error);
      }
    } else {
      console.error('Form geçersiz');
    }
  };

  onLogin = async () => {
    this.authService
      .login(this.loginForm.value.emailLG, this.loginForm.value.passwordLG)
      .then((user) => this.modalService.closeModal())
      .catch((err) => console.log('hata' + err));
  };
}
