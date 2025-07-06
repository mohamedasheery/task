import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tower } from './tower';

describe('Tower', () => {
  let component: Tower;
  let fixture: ComponentFixture<Tower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tower);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
