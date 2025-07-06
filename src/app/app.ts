import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./pages/components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'task';
}
