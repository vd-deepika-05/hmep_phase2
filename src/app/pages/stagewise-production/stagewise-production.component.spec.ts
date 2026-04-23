import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagewiseProductionComponent } from './stagewise-production.component';

describe('StagewiseProductionComponent', () => {
  let component: StagewiseProductionComponent;
  let fixture: ComponentFixture<StagewiseProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StagewiseProductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagewiseProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
