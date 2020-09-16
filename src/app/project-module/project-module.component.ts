import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, Project, StartupData, Startup } from '../project-data';


@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrls: ['./project-module.component.css']
})
export class ProjectModuleComponent implements OnInit {

  constructor(private api:ApiResponseService) { }
  
  
  startups: Startup[];
  projects: Project[];
  startupFilter: {["Startup Engaged"]};
  selected: string;
  formStatus: boolean = true;

  @Input() project: Project;

  ngOnInit(): void {
    //Populates the page with all startups
    this.api.getStartups().subscribe((response: StartupData) => {
      console.log(response)
      this.startups = response.records
    })
  }

  getProjects(): void {
    this.api.getProjects().subscribe((response: ProjectData) => {
      console.log(response)
      this.projects = response.records
    })
  }

  //filter method for filtering project list by startup name
  //https://stackoverflow.com/questions/50591939/angular-how-to-filter-ngfor-to-specific-object-property-data
   filterProjects(): void {
     //this.filteredValues = values.filter(project => project.category === 'Startup Engaged');
  }

  getId(index: number) {
    //Grabs the id of startup
    this.api.getStartups().subscribe((response: ProjectData) => {
      this.selected = response.records[index].id;
      console.log(this.selected)
      return this.selected;
    })
  }

  
}
;