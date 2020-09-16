import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, Project, StartupData, Startup } from '../project-data';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: Project;

  projects: Project[];
  startupFilter: {["Startup Engaged"]};

  constructor(private api:ApiResponseService) { }

  ngOnInit(): void {
  }


  getProjects(): void {
    this.api.getProjects('').subscribe((response: ProjectData) => {
      console.log(response)
      this.projects = response.records
    })
  }

  //filter method for filtering project list by startup name
  //https://stackoverflow.com/questions/50591939/angular-how-to-filter-ngfor-to-specific-object-property-data
   filterProjects(): void {
     //this.filteredValues = values.filter(project => project.category === 'Startup Engaged');
  }

}
