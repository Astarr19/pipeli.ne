import { Component, OnInit } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData } from '../project-data';

@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrls: ['./project-module.component.css']
})
export class ProjectModuleComponent implements OnInit {

  constructor(private api:ApiResponseService) { }
  
projects:ProjectData

  ngOnInit(): void {
    this.api.getProjects().subscribe((response: ProjectData[]) => {
      this.projects = response.fields
    })
  }
}
