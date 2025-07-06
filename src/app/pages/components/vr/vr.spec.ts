import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vr } from './vr';

describe('Vr', () => {
  let component: Vr;
  let fixture: ComponentFixture<Vr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
