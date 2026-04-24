import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingReadinessComponent } from './billing-readiness.component';

describe('BillingReadinessComponent', () => {
  let component: BillingReadinessComponent;
  let fixture: ComponentFixture<BillingReadinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingReadinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingReadinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
