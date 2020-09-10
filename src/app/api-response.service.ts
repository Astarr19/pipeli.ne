import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apikey } from '../apikey'

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://scgcairtable.herokuapp.com/master-list'; 
  getProjects() {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }
}