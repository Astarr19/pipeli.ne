import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://scgcairtable.herokuapp.com/master-list';
  pageSize: string = '?pageSize=5'
  getProjects(offset?: string) {
    if (offset){
      return this.http.get(this.apiUrl + this.pageSize + offset);

    } else {
      return this.http.get(this.apiUrl + this.pageSize);
    }
  }

  updateProject(id, item) {
    return this.http.put(`${this.apiUrl}/${id}`, {fields: item}, {responseType: "json"})
  }
}