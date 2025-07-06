import { Map } from "../map/map";
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// declare const $: any;

@Component({
  selector: 'app-home',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})



export class Home implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  totalFrames = 36;
  currentFrame = 0;
  dragging = false;
  startX = 0;
  images: HTMLImageElement[] = [];

  ngAfterViewInit() {
    this.preloadImages().then(() => {
      this.drawImage();
      const canvas = this.canvasRef.nativeElement;

      canvas.addEventListener('mousedown', (e) => {
        this.dragging = true;
        this.startX = e.clientX;
      });

      canvas.addEventListener('mouseup', () => this.dragging = false);

      canvas.addEventListener('mousemove', (e) => {
        if (!this.dragging) return;
        const delta = e.clientX - this.startX;
        if (Math.abs(delta) > 5) {
          const direction = delta > 0 ? 1 : -1;
          this.currentFrame = (this.currentFrame + direction + this.totalFrames) % this.totalFrames;
          this.startX = e.clientX;
          this.drawImage();
        }
      });

      // دعم للموبايل
      canvas.addEventListener('touchstart', (e) => {
        this.dragging = true;
        this.startX = e.touches[0].clientX;
      });

      canvas.addEventListener('touchend', () => this.dragging = false);

      canvas.addEventListener('touchmove', (e) => {
        if (!this.dragging) return;
        const delta = e.touches[0].clientX - this.startX;
        if (Math.abs(delta) > 5) {
          const direction = delta > 0 ? 1 : -1;
          this.currentFrame = (this.currentFrame + direction + this.totalFrames) % this.totalFrames;
          this.startX = e.touches[0].clientX;
          this.drawImage();
        }
        e.preventDefault();
      }, { passive: false });
    });
  }

  preloadImages(): Promise<void> {
    const promises = [];
    for (let i = 1; i <= this.totalFrames; i++) {
      const padded = i.toString().padStart(4, '0');
      const img = new Image();
      img.src = `assets/img/rotation/pics-o/36_${padded}_Ultra.jpg`;
      // `assets/img/rotation/pics-o/36_0001_Ultra.jpg`
      this.images.push(img);
      promises.push(
        new Promise((res) => img.onload = res)
      );
    }
    return Promise.all(promises).then(() => {});
  }

  drawImage() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = this.images[this.currentFrame];

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // أرسم الصورة متناسبة
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }
}



