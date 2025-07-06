import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {
  constructor(private router: Router) {}

  startTask() {
    // اذهب إلى صفحة الـ viewer أو صفحة المهام
    this.router.navigate(['/home']);
  }
}
