import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcDecisionComponent } from './qc-decision.component';

describe('QcDecisionComponent', () => {
  let component: QcDecisionComponent;
  let fixture: ComponentFixture<QcDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QcDecisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
