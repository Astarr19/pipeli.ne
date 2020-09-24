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
  pageSize: string = 'pageSize=20'
   
  //get all function for getting list of all startups in project-module component

  getStartups(offset: string, filters?: string) {
    if (filters && offset){
      filters = "filterByFormula=" + filters;
      offset = "offset=" + offset;
      return this.http.get(`${this.apiUrl}/${this.masterList}?${this.pageSize}&${filters}&${offset}`);
    } else if (filters) {
      filters = "filterByFormula=" + filters;
      return this.http.get(`${this.apiUrl}/${this.masterList}?${this.pageSize}&${filters}`);
    } else if (offset) {
      offset = "offset=" + offset;
      return this.http.get(`${this.apiUrl}/${this.masterList}?${this.pageSize}&${offset}`)
    } else {
      return this.http.get(`${this.apiUrl}/${this.masterList}?${this.pageSize}`);
    }
  }

  //method to pull all projects with the same Startup name from the Projects tab
  getProjects(name: string) {
      return this.http.get(`${this.apiUrl}/${this.projectList}?filterByFormula=${name}`);
  } 

  //not being used, to be deleted eventually
  updateProject(id, item) {
    return this.http.put(`${this.apiUrl}/${id}`, {fields: item}, {responseType: "json"})
  }
}