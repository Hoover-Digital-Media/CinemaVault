import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
