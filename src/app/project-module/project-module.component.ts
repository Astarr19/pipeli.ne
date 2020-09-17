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
  nextButton: boolean = true;
  lastButton: boolean = false;
  index: number = 0;
  offsetArr: string[] = [''];
  filters: string;

  @Input() project: Project;

  ngOnInit(): void {
    //Populates the page with all startups
    this.api.getProjects(this.offsetArr[0]).subscribe((response: ProjectData) => {
      this.offsetArr.push(response.offset);
      this.projects = response.records;
    })
  }

  nextPage() {
    this.index++;
    this.api.getProjects(this.offsetArr[this.index], this.filters).subscribe((response:ProjectData) => {
      if ((this.index + 1) >= this.offsetArr.length) {
        if (response.offset !== undefined) {
          this.offsetArr.push(response.offset);
        } else {
          this.offsetArr.push(null);
        }
      }
      if (this.offsetArr[this.index + 1] === null) {
        this.nextButton = false;
      }
      this.lastButton = true;
      this.projects = response.records;
    // this.api.getStartups(this.offsetArr[this.index]).subscribe((response: StartupData) => {
    //   console.log(response)
    //   this.startups = response.records
    })
  }


  // getProjects(): void {
  //   this.api.getProjects(this.offsetArr[this.index]).subscribe((response: ProjectData) => {
  //     console.log(response)
  //     this.projects = response.records
  //   })
  // }

  

  getId(index: number) {
    //Grabs the id of startup
    this.api.getStartups(this.offsetArr[this.index]).subscribe((response: StartupData) => {
      this.selected = response.records[index].id;
      console.log(this.selected)
      return this.selected;
    })
  }

  lastPage() {
    if (this.index - 1 === 0) {
      this.lastButton = false;
    }
    this.index--;
    this.nextButton = true;
    this.api.getProjects(this.offsetArr[this.index], this.filters).subscribe((response:ProjectData) => {
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
    this.filters = str;
    this.offsetArr = [''];
    this.index = 0;
    this.api.getProjects(this.offsetArr[this.index], str).subscribe((response: ProjectData) => {
      this.offsetArr.push(response.offset);
      this.projects = response.records;
    })
  }
};