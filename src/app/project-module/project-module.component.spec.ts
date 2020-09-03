import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModuleComponent } from './project-module.component';

describe('ProjectModuleComponent', () => {
  let component: ProjectModuleComponent;
  let fixture: ComponentFixture<ProjectModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
