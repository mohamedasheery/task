import { Component } from '@angular/core';

@Component({
  selector: 'app-vr',
  imports: [],
  templateUrl: './vr.html',
  styleUrl: './vr.scss'
})
export class Vr {
goBack(){

  window.history.back();
}
}
