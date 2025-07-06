import { Map } from "../map/map";
import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";

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

  canvasWidth = 0;
canvasHeight = 0;
  totalFrames = 36;
  currentFrame = 0;
  dragging = false;
  startX = 0;
  images: HTMLImageElement[] = [];

  zoom = 1;
  zoomStep = 0.1;
  minZoom = 0.5;
  maxZoom = 3;

  initialPinchDistance: number | null = null;
  initialZoom = 1;

  constructor(private cdr: ChangeDetectorRef , private router:Router){}

  ngAfterViewInit() {
 const canvas = this.canvasRef.nativeElement;
this.canvasWidth = canvas.clientWidth;
this.canvasHeight = canvas.clientHeight;

  // حل المشكلة هنا
  this.cdr.detectChanges();

    this.preloadImages().then(() => {
      this.drawImage();


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

      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (e.deltaY < 0) {
          this.zoom = Math.min(this.zoom + this.zoomStep, this.maxZoom);
        } else {
          this.zoom = Math.max(this.zoom - this.zoomStep, this.minZoom);
        }

        this.drawImage();
      });


      // دعم للموبايل
      canvas.addEventListener('touchstart', (e) => {
        this.dragging = true;
        this.startX = e.touches[0].clientX;

        if (e.touches.length === 2) {
          this.initialPinchDistance = this.getDistance(e.touches[0], e.touches[1]);
          this.initialZoom = this.zoom;
        }
      });

      canvas.addEventListener('touchend', () => {
        this.dragging = false;
        this.initialPinchDistance = null;
      });

      canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && this.initialPinchDistance !== null) {
          const newDistance = this.getDistance(e.touches[0], e.touches[1]);
          const scale = newDistance / this.initialPinchDistance;
          this.zoom = Math.min(this.maxZoom, Math.max(this.minZoom, this.initialZoom * scale));
          this.drawImage();
          e.preventDefault(); // يمنع التمرير الطبيعي
          return;
        }

        if (!this.dragging || e.touches.length !== 1) return;
        const delta = e.touches[0].clientX - this.startX;
        if (Math.abs(delta) > 5) {
          const direction = delta > 0 ? 1 : -1;
          this.currentFrame = (this.currentFrame + direction + this.totalFrames) % this.totalFrames;
          this.startX = e.touches[0].clientX;
          this.drawImage();
        }
        e.preventDefault();
      },


        { passive: false });
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
    return Promise.all(promises).then(() => { });
  }

  drawImage() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = this.images[this.currentFrame];

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * this.zoom;

    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }


  zoomIn() {
  this.zoom = Math.min(this.zoom + this.zoomStep, this.maxZoom);
  this.drawImage();
}

zoomOut() {
  this.zoom = Math.max(this.zoom - this.zoomStep, this.minZoom);
  this.drawImage();
}

  resetZoom() {
    this.zoom = 1;
    this.drawImage();
  }



  hotspots = [
  { x: 150, y: 100, radius: 30, name: 'نقطة 1' },
  { x: 300, y: 200, radius: 25, name: 'نقطة 2' }
];

onMouseMove(event: MouseEvent) {
  const rect = this.canvasRef.nativeElement.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for (const spot of this.hotspots) {
    const dist = Math.sqrt((mouseX - spot.x) ** 2 + (mouseY - spot.y) ** 2);
    if (dist <= spot.radius) {
      console.log('مررت فوق', spot.name);
      // تقدر تعمل تأثيرات أو تغير المؤشر
      break;
    }
  }
}





tooltipText = '';
tooltipVisible = false;
tooltipX = 0;
tooltipY = 0;

onHotspotHover(name: string, event: MouseEvent , element: HTMLElement) {
  this.tooltipText = name;
  this.tooltipVisible = true;
  this.tooltipX = event.clientX + 10;
  this.tooltipY = event.clientY + 10;
  console.log('مررت فوق', name);
    element.setAttribute('fill', 'rgba(0, 150, 255, 0.5)'); // غيّر اللون

}

onHotspotLeave(element: HTMLElement) {
  this.tooltipVisible = false;
    element.setAttribute('fill', 'rgba(255, 0, 0, 0.3)'); // رجّع اللون

}

onHotspotClick(){
  this.router.navigate(['/vr']);
}



}



