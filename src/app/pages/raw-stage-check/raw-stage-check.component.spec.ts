import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawStageCheckComponent } from './raw-stage-check.component';

describe('RawStageCheckComponent', () => {
  let component: RawStageCheckComponent;
  let fixture: ComponentFixture<RawStageCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RawStageCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawStageCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
