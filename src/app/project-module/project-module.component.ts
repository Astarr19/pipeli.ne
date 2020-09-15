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
  offset: string;
  index: number = 0;
  offsetArr: string[] = [''];

  ngOnInit(): void {
    //Populates the page with all startups
    this.api.getProjects('').subscribe((response: ProjectData) => {
      if ((this.index + 1) > this.offsetArr.length) {
        this.offsetArr.push(response.offset);
      }
      this.projects = response.records
    })
  }

  nextPage() {
    this.index++;
    this.api.getProjects(this.offsetArr[this.index]).subscribe((response:ProjectData) => {
      if ((this.index + 1) > this.offsetArr.length) {
        this.offsetArr.push(response.offset);
      }
      this.projects = response.records;
    })
    console.log(this.offsetArr, this.index)
  }

  lastPage() {
    this.index--;
    this.api.getProjects(this.offsetArr[this.index]).subscribe((response:ProjectData) => {
      this.offset = response.offset;
      this.projects = response.records;
    })
  }

  filter(obj: object) {
    let str = '';
    if (obj["city"]) {
      str += encodeURI(`{city}='${obj["city"]}'`);
    }
    if (obj["country"]) {
      if (str !== '') {
        str += '&';
      }
      str += encodeURI(`{country}='${obj["country"]}'`);
    }
    if (obj["themes"]) {
      if (str !== '') {
        str += '&';
      }
      str += encodeURI(`{themes}='${obj["themes"]}'`);
    }
    console.log(obj);
    this.api.getProjects('', str).subscribe((response: ProjectData) => {
      this.offset = response.offset;
      this.projects = response.records;
    })
  }

  
}
;