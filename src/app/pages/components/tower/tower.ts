import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tower',
  imports: [CommonModule],
  templateUrl: './tower.html',
  standalone: true,
  styleUrl: './tower.scss'
})
export class Tower {

  highlightedFloor: string | null = null;

  tooltip = {
  visible: false,
  floor: '',
  unit: '88',
  x: 0,
  y: 0
};
  constructor(private router: Router) { }


highlightFloor(floor: string) {
  this.highlightedFloor = floor;
  this.showTooltip(floor);
}

unhighlightFloor() {
  this.highlightedFloor = null;
  this.hideTooltip();
}



showTooltip( floor: string) {
  this.tooltip.visible = true;
  this.tooltip.floor = floor;
}

hideTooltip() {
  this.tooltip.visible = false;
}

updateTooltip(event: MouseEvent) {
  this.tooltip.x = event.clientX + 10;
  this.tooltip.y = event.clientY + 10;
}



  moveToVr() {
    console.log('Navigating to VR');
    
    this.router.navigate(['/vr']);
  }




}
