import { Component, OnInit } from '@angular/core';
import { ApiResponseService } from './api-response.service'
import {ProjectData, ProjectChild} from './project-data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private api: ApiResponseService) {}
  projects: ProjectChild;
  ngOnInit() { }
}
