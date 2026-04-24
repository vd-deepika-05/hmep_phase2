import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintCheckComponent } from './paint-check.component';

describe('PaintCheckComponent', () => {
  let component: PaintCheckComponent;
  let fixture: ComponentFixture<PaintCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaintCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
