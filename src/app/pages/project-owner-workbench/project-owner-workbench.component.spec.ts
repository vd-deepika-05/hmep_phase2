import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOwnerWorkbenchComponent } from './project-owner-workbench.component';

describe('ProjectOwnerWorkbenchComponent', () => {
  let component: ProjectOwnerWorkbenchComponent;
  let fixture: ComponentFixture<ProjectOwnerWorkbenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectOwnerWorkbenchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOwnerWorkbenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
