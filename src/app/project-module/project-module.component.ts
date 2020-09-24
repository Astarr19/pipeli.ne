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
  selected: string;
  formStatus: boolean = true;
  nextButton: boolean = true;
  lastButton: boolean = false;
  index: number = 0;
  offsetArr: string[] = [''];
  filters: string;
  ngOnInit(): void {
    //Populates the page with all startups
    this.api.getStartups(this.offsetArr[0]).subscribe((response: StartupData) => {
      this.offsetArr.push(response.offset);
      this.startups = response.records;
      this.fixAlignment(this.startups);
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
      this.fixAlignment(this.startups);
    })
  }
  fixAlignment(startups: Project[]) {
    startups.forEach((startup: Project)=>{
      if (startup.fields["Alignment"]) {
        startup.fields["Alignment"] = startup.fields["Alignment"].split(",").map((Alignment)=>{
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
    })
  }
  getstartups(): void {
    this.api.getStartups(this.offsetArr[this.index]).subscribe((response: StartupData) => {
      console.log(response)
      this.startups = response.records
    })
  }

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
    this.api.getStartups(this.offsetArr[this.index], this.filters).subscribe((response:ProjectData) => {
      this.startups = response.records;
      this.fixAlignment(this.startups);
    })
  }
  filter(obj: object) {
    let str = '';
    if (obj["name"]) {
      str += `FIND('${obj["name"]}', {Company Name})`;
    }
    if (obj["city"]) {
      if (str !== '') {
        str += '&';
      }
      str += `FIND('${obj["city"]}', {City})`;
    }
    if (obj["country"]) {
      if (str !== '') {
        str += '&';
      }
      str += `FIND('${obj["country"]}', {Country})`;
    } if (obj["alignment"]) {
      if (str !== '') {
        str += '&';
      }
      str += `FIND('${obj["alignment"]}', {Alignment})`
    }
    this.filters = encodeURI(str);
    this.offsetArr = [''];
    this.index = 0;
    this.api.getStartups(this.offsetArr[this.index], str).subscribe((response: ProjectData) => {
      console.log(str);
      this.offsetArr.push(response.offset);
      this.startups = response.records;
      this.fixAlignment(this.startups);
    })
  }


};
