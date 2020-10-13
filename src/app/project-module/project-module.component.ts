import { splitAtPeriod } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseService } from '../api-response.service';
import { ProjectData, Project, Startup, StartupData } from '../project-data';
@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrls: ['./project-module.component.css']
})
export class ProjectModuleComponent implements OnInit {
  constructor(private api:ApiResponseService) { }
  startups: Startup[];
  nextButton: boolean = true;
  lastButton: boolean = false;
  index: number = 0;
  offsetArr: string[] = [''];
  filters: string;

  ngOnInit(): void {
    //Populates the page with all startups

    this.api.getStartups(this.offsetArr[this.index]).subscribe((response: ProjectData) => {
      this.offsetArr.push(response.offset);
      this.startups = response.records;
      this.fixDisplay(this.startups, "Alignment");
      this.fixDisplay(this.startups, "Theme(s)");
    })
  }

  nextPage() {
    this.index++;
    this.api.getStartups(this.offsetArr[this.index], this.filters).subscribe((response:StartupData) => {
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
      this.startups = response.records;

      this.fixDisplay(this.startups, "Alignment");
      this.fixDisplay(this.startups, "Theme(s)");
    })
  }

  fixDisplay(startups: Project[], field: string) {
    startups.forEach((startup: Project)=>{
      if (startup.fields[field]) {
        startup.fields[field] = startup.fields[field].split(",").map((Alignment)=>{
          return Alignment.trim();
        }).join(", ")
      }

      if (startup.fields["Uniqueness"] == '5') {
        startup.fields["Uniqueness"] = '★★★★★';
      } else if(startup.fields["Uniqueness"] == '4') {
        startup.fields["Uniqueness"] = '★★★★☆';
      } else if(startup.fields["Uniqueness"] == '3') {
        startup.fields["Uniqueness"] = '★★★☆☆';
      } else if(startup.fields["Uniqueness"] == '2') {
        startup.fields["Uniqueness"] = '★★☆☆☆';
      } else if(startup.fields["Uniqueness"] == '1') {
        startup.fields["Uniqueness"] = '★☆☆☆☆';
      }

      if (startup.fields["Team"] == '5') {
        startup.fields["Team"] = '★★★★★';
      } else if(startup.fields["Team"] == '4') {
        startup.fields["Team"] = '★★★★☆';
      } else if(startup.fields["Team"] == '3') {
        startup.fields["Team"] = '★★★☆☆';
      } else if(startup.fields["Team"] == '2') {
        startup.fields["Team"] = '★★☆☆☆';
      } else if(startup.fields["Team"] == '1') {
        startup.fields["Team"] = '★☆☆☆☆';
      }
    })
  }
  lastPage() {
    if (this.index - 1 === 0) {
      this.lastButton = false;
    }
    this.index--;
    this.nextButton = true;
    this.api.getStartups(this.offsetArr[this.index], this.filters).subscribe((response:ProjectData) => {
      this.startups = response.records;
      this.fixDisplay(this.startups, "Alignment");
      this.fixDisplay(this.startups, "Theme(s)");
    })
  }
  filter(obj: object) {
    let str = '';
    let and = 0;
    if (obj["name"]) {
      str += `FIND('${obj["name"]}', {Company Name})`;
      and++;
    }
    if (obj["city"]) {
      if (str !== '') {
        str += ', ';
      }
      str += `FIND('${obj["city"]}', {City})`;
      and++;
    }
    if (obj["country"]) {
      if (str !== '') {
        str += ', ';
      }
      str += `FIND('${obj["country"]}', {Country})`;
      and++;
    } if (obj["alignment"]) {
      if (str !== '') {
        str += ', ';
      }
      str += `FIND('${obj["alignment"]}', {Alignment})`;
      and++;
    } if (and > 1) {
      str = `AND(${str})`
    }
    this.filters = encodeURI(str);
    this.offsetArr = [''];
    this.index = 0;
    this.api.getStartups(this.offsetArr[this.index], str).subscribe((response: ProjectData) => {
      this.offsetArr.push(response.offset);
      this.startups = response.records;
      this.fixDisplay(this.startups, "Alignment");
      this.fixDisplay(this.startups, "Theme(s)");
    })
  }
}
