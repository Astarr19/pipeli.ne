import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://scgcairtable.herokuapp.com/master-list';
  getProjects() {
    return this.http.get(this.apiUrl);
  }

  filtered(searchCriteria?: filterInterface)
  {
    let url: string = this.apiUrl + '?fields%5B%5D=';
    if(!searchCriteria) {
        url = url + 'Company%20Name';
    };


  }
}

export interface filterInterface {
    name: string;
}