import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformanceReportComponent } from './non-conformance-report.component';

describe('NonConformanceReportComponent', () => {
  let component: NonConformanceReportComponent;
  let fixture: ComponentFixture<NonConformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonConformanceReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonConformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
