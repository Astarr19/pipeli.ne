import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://scgcairtable.herokuapp.com/master-list';
  pageSize: string = 'pageSize=20';
  getProjects(offset: string, filters?: string) {
    if (filters && offset){
      filters = "filterByFormula=" + filters;
      offset = "offset=" + offset;
      return this.http.get(`${this.apiUrl}?${this.pageSize}&${filters}&${offset}`);
    } else if (filters) {
      filters = "filterByFormula=" + filters;
      return this.http.get(`${this.apiUrl}?${this.pageSize}&${filters}`);
    } else if (offset) {
      offset = "offset=" + offset;
      return this.http.get(`${this.apiUrl}?${this.pageSize}&${offset}`)
    } else {
      return this.http.get(`${this.apiUrl}?${this.pageSize}`);
    }
  }

  updateProject(id, item) {
    return this.http.put(`${this.apiUrl}/${id}`, {fields: item}, {responseType: "json"})
  }
}