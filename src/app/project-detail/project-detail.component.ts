import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, Project, StartupData, Startup } from '../project-data';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() index: number;
  @Input() startups: Startup[];
  company: string;
  projects: Project[];
  noProjects: boolean = false;
  startupFilter: {["Startup Engaged"]};

  constructor(private api:ApiResponseService) { }

  ngOnInit(): void {
    console.log(this.index, this.startups)
    this.company = encodeURI(`{Startup Engaged} = '${this.startups[this.index].fields["Company Name"]}'`)
  }

  getProjects(company: string): void {
    this.company = this.startups[this.index].fields["Company Name"];
    this.api.getProjects(company).subscribe((response: ProjectData) => {
      this.projects = response.records
      console.log(this.projects);
      if (this.projects === undefined) {
        this.noProjects = true;
      }
    })
  }

}
