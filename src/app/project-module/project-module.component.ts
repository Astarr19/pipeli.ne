import { Component, OnInit } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, ProjectChild, Project } from '../project-data';


@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrls: ['./project-module.component.css']
})
export class ProjectModuleComponent implements OnInit {

  //projects: ProjectData;
 
  constructor(private api: ApiResponseService) { }
  
projects: Project[];

  ngOnInit(): void {
    this.api.getProjects().subscribe((response: ProjectData) => {
      console.log(response)
      this.projects = response.records
      //only error on Michael's end
    })
  }
}
;