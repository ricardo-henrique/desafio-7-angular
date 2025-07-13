import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Menu } from '../components/menu/menu';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Menu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}
}
