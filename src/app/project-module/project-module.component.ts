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
  filteredStartups: Startup[];
  selected: string;
  filters: string;

  ngOnInit(): void {
    //Populates the page with all startups
    this.api.getStartups().subscribe((response: ProjectData) => {
      this.startups = response.records;
      this.fixAlignment(this.startups);
    })
  }

  // nextPage() {
  //   this.index++;
  //   this.api.getStartups(this.offsetArr[this.index], this.filters).subscribe((response:ProjectData) => {
  //     if ((this.index + 1) >= this.offsetArr.length) {
  //       if (response.offset !== undefined) {
  //         this.offsetArr.push(response.offset);
  //       } else {
  //         this.offsetArr.push(null);
  //       }
  //     }
  //     if (this.offsetArr[this.index + 1] === null) {
  //       this.nextButton = false;
  //     }
  //     this.lastButton = true;
  //     this.startups = response.records;
  //     this.fixAlignment(this.startups);
  //   // this.api.getStartups(this.offsetArr[this.index]).subscribe((response: StartupData) => {
  //   //   console.log(response)
  //   //   this.startups = response.records
  //   })
  // }

  fixAlignment(startups: Project[]) {
    startups.forEach((startup: Project)=>{
      if (startup.fields["Alignment"]) {
        startup.fields["Alignment"] = startup.fields["Alignment"].split(",").map((Alignment)=>{
          return Alignment.trim();
        }).join(", ")
      }
    })
  }

  getStartups(): void {
    this.api.getStartups().subscribe((response: ProjectData) => {
      console.log(response)
      this.startups = response.records
    })
  }

  //filter method for filtering project list by startup name
  //https://stackoverflow.com/questions/50591939/angular-how-to-filter-ngfor-to-specific-object-property-data
  //  filterstartups(): void {
  //    this.filteredValues = values.filter(project => project.category === 'Startup Engaged');
  // getStartups(): void {
  //   this.api.getStartups(this.offsetArr[this.index]).subscribe((response: ProjectData) => {
  //     console.log(response)
  //     this.startups = response.records
  //   })
  // }

  

  getId(index: number) {
    //Grabs the id of startup
    this.api.getStartups().subscribe((response: StartupData) => {
      this.selected = response.records[index].id;
      console.log(this.selected)
      return this.selected;
    })
  }

  // lastPage() {
  //   if (this.index - 1 === 0) {
  //     this.lastButton = false;
  //   }
  //   this.index--;
  //   this.nextButton = true;
  //   this.api.getStartups(this.offsetArr[this.index], this.filters).subscribe((response:ProjectData) => {
  //     this.startups = response.records;
  //     this.fixAlignment(this.startups);
  //   })
  // }

  filter(obj: object) {
    this.filteredStartups = this.startups.filter((el)=>{
      return el.fields["Company Name"].includes(obj["name"]);
    })
    console.log(this.filteredStartups)
  }
};
