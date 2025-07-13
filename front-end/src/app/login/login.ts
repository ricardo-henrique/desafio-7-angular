import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Authentication } from '../services/auth/authentication';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  nome = '';
  senha = '';
  currentDate = new Date();

  constructor(private router: Router, private auth: Authentication) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    this.auth.login(this.nome, this.senha).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        alert('nome ou senha invalidos');
        console.error(err);
      },
    });
  }
}
