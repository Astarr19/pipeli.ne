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
  // selected: string;
  // formStatus: boolean = true;
  // nextButton: boolean = true;
  // lastButton: boolean = false;
  // index: number = 0;
  // offsetArr: string[] = [''];
  // filters: string;

  constructor(private api:ApiResponseService) { }

  ngOnInit(): void {
  }

  getProjects(): void {
    this.api.getProjects('').subscribe((response: ProjectData) => {
      console.log(response)
      this.projects = response.records
    })
  }

}
