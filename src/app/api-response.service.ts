import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiKey } from '../apikey'

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
// Use javascript documentation instead of Curl
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://api.airtable.com/v0/appyPW0SwJXXoyIMP/Master%20List/recG1qPXqhrj154xh?api';
  authorization: string = `-H "Authorization: Bearer ${apiKey}"`
  getProjects() {
    return this.http.get(this.apiUrl + this.authorization);
  }
}
