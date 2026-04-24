import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBomComponent } from './detail-bom.component';

describe('DetailBomComponent', () => {
  let component: DetailBomComponent;
  let fixture: ComponentFixture<DetailBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailBomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
