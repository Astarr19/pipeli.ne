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
  //get all function for getting list of all startups in project-module component
  //change getProjects to getStartups?
  getStartups(filters?: string) {
     if (filters) {
      filters = "filterByFormula=" + filters;
      return this.http.get(`${this.apiUrl}/${this.masterList}?${filters}`);
    } else {
      return this.http.get(`${this.apiUrl}/${this.masterList}`);
    }
  }

  //method to pull all projects with the same Startup name from the Projects tab
  getProjects(name: string) {
      return this.http.get(`${this.apiUrl}/${this.projectList}?filterByFormula=${name}`);
  } 

  updateProject(id, item) {
    return this.http.put(`${this.apiUrl}/${id}`, {fields: item}, {responseType: "json"})
  }
}