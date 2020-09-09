import { Component, OnInit } from '@angular/core';
import { ApiResponseService } from '../api-response.service';


@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrls: ['./project-module.component.css']
})
export class ProjectModuleComponent implements OnInit {

  //projects: ProjectData;
 
  constructor(private api: ApiResponseService) { }
  
  ngOnInit(): void {
    //this.api.getProjects().subscribe((response: ProjectData[]))
  }

  //projects: any[];
  private apiUrl: 'https://api.airtable.com/v0/appyPW0SwJXXoyIMP/Master%20List';
  private apiKey: 'keyrGCzYtMOPjVOls';
}
