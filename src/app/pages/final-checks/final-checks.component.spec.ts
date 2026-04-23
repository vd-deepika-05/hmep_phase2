import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalChecksComponent } from './final-checks.component';

describe('FinalChecksComponent', () => {
  let component: FinalChecksComponent;
  let fixture: ComponentFixture<FinalChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalChecksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
