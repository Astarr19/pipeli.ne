import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, Project, FoundObj, Startup } from '../project-data';

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

  //this sets project data fields to not display if the Airtable cell has no input
  //default is set to "false"
  found: FoundObj = {
    projectLead: false,
    maturityScore: false,
    ongoingStatus: false,
    statusSchedule: false,
    firstEngagement: false,
    interestedPartners: false,
    engagementType: false,
    seamlessInvestment: false
  }
  
  
  startupFilter: {["Startup Engaged"]};

  constructor(private api:ApiResponseService) { }

  ngOnInit(): void {
    this.company = encodeURI(`{Startup Engaged} = '${this.startups[this.index].fields["Company Name"]}'`)
  }

  getProjects(company: string): void {
    this.company = this.startups[this.index].fields["Company Name"];
    this.api.getProjects(company).subscribe((response: ProjectData) => {
      this.projects = response.records;
      if (this.projects.length === 0) {
        this.noProjects = true;
      } 
    })
  }

  toggleDisplay() {
    this.noProjects = !this.noProjects;    
  }
  

}


