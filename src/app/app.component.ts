import { Component, OnInit } from '@angular/core';
import { ApiResponseService } from './api-response.service';
import { ProjectData } from './project-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private api: ApiResponseService) {}
  title = 'pipeli.ne';
  projects: ProjectData[];
  ngOnInit() {
    this.api.getProjects().subscribe((data: ProjectData[])=>{
      this.projects = data;
    })
  }
}
  
