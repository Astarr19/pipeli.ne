import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://scgcairtable.herokuapp.com';
  masterList: string = 'master-list'
  projectList: string = 'projects'
  pageSize: string = 'pageSize=5'
  //get all function for getting list of all startups in project-module component
  //change getProjects to getStartups?
  getStartups(offset: string, filters?: string) {
    if (offset){
      return this.http.get(`${this.apiUrl}/${this.masterList}?${this.pageSize}&${offset}`);

    } else {
      return this.http.get(`${this.apiUrl}/${this.masterList}?${this.pageSize}`);
    }
  }

  //method to pull all projects with the same Startup name from the Projects tab
  getProjects(offset: string, filters?: string) {
    if (offset){
      return this.http.get(this.apiUrl + this.projectList + offset);
    } else {
      return this.http.get(this.apiUrl + this.projectList);
    }
  } 

  updateProject(id, item) {
    return this.http.put(`${this.apiUrl}/${id}`, {fields: item}, {responseType: "json"})
  }
}