import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class Map implements OnInit, OnDestroy {

  // @ViewChild('canvas3D', { static: true }) canvasRef!: ElementRef;

  //   ngAfterViewInit(): void {
  //     const canvas = this.canvasRef.nativeElement;
  //     const scene = new THREE.Scene();
  //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     camera.position.set(0, 2, 5);

  //     const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  //     scene.add(light);

  //     const loader = new GLTFLoader();
  //     loader.load('assets/model/test1.glb', (gltf) => {
  //       scene.add(gltf.scene);
  //     });

  //     const controls = new OrbitControls(camera, renderer.domElement);
  //     controls.enableDamping = true;
  //     controls.dampingFactor = 0.05;
  //     controls.target.set(0, 1, 0);
  //     controls.update();

  //     const animate = () => {
  //       requestAnimationFrame(animate);
  //       controls.update(); // ضروري
  //       renderer.render(scene, camera);
  //     };
  //     animate();
  //   }


  // totalFrames = 36;
  // currentFrame = 0;
  // isDragging = false;
  // startX = 0;
  // currentImage = `assets/img/rotation/pics-o/36_0001_Ultra.jpg`;


  
  private boundMouseMove: (event: MouseEvent) => void;
private boundMouseUp: () => void;
constructor(){
  // يمكنك استخدام هذا المكان لتهيئة أي شيء آخر إذا لزم الأمر
  this.boundMouseMove = this.onMouseMove.bind(this);
  this.boundMouseUp = this.onMouseUp.bind(this);
}
  
totalFrames = 36;
currentFrame = 0;
startX = 0;
isDragging = false;
currentImage = this.getFrameImage(0);

ngOnInit() {
  window.addEventListener('mousemove', this.onMouseMove);
  window.addEventListener('mouseup', this.onMouseUp);
  window.addEventListener('touchmove', this.onTouchMove, { passive: false });
  window.addEventListener('touchend', this.onMouseUp);
}

ngOnDestroy() {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.onMouseUp);
  window.removeEventListener('touchmove', this.onTouchMove);
  window.removeEventListener('touchend', this.onMouseUp);
}

onMouseDown(event: MouseEvent) {
  this.isDragging = true;
  this.startX = event.clientX;
  document.querySelector('.viewer')?.classList.add('dragging');
}

onTouchStart(event: TouchEvent) {
  this.isDragging = true;
  this.startX = event.touches[0].clientX;
  document.querySelector('.viewer')?.classList.add('dragging');
}

onMouseUp = () => {
  this.isDragging = false;
  document.querySelector('.viewer')?.classList.remove('dragging');
}

onMouseMove = (event: MouseEvent) => {
  if (!this.isDragging) return;
  const deltaX = event.clientX - this.startX;
  this.updateFrameFromDelta(deltaX);
  this.startX = event.clientX;
};

onTouchMove = (event: TouchEvent) => {
  if (!this.isDragging) return;
  const deltaX = event.touches[0].clientX - this.startX;
  this.updateFrameFromDelta(deltaX);
  this.startX = event.touches[0].clientX;
  event.preventDefault();
};

updateFrameFromDelta(deltaX: number) {
  const threshold = 5; // كل 5 بكسل نغير الصورة
  if (Math.abs(deltaX) >= threshold) {
    const direction = deltaX > 0 ? 1 : -1;
    this.currentFrame = (this.currentFrame + direction + this.totalFrames) % this.totalFrames;
    this.currentImage = this.getFrameImage(this.currentFrame);
  }
}
getFrameImage(frameIndex: number): string {
  const padded = (frameIndex + 1).toString().padStart(4, '0');
  return `assets/img/rotation/pics-o/36_${padded}_Ultra.jpg`;
  // assets/img/rotation/pics-o/36_0001_Ultra.jpg
}




}
