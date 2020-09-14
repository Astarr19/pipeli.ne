import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, Project } from '../project-data';


@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrls: ['./project-module.component.css']
})
export class ProjectModuleComponent implements OnInit {

  constructor(private api:ApiResponseService) { }
  
  projects: Project[];
  selected: string;
  formStatus: boolean = true;

  ngOnInit(): void {
    //Populates the page with all startups
    this.api.getProjects().subscribe((response: ProjectData) => {
      console.log(response)
      this.projects = response.records
    })
  }

  getId(index: number) {
    //Grabs the id of startup
    this.api.getProjects().subscribe((response: ProjectData) => {
      this.selected = response.records[index].id;
      console.log(this.selected)
      return this.selected;
    })
  }

  
}
;