import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apikey } from '../apikey'

@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'https://api.airtable.com/v0/appyPW0SwJXXoyIMP/Master%20List'; // https://scgcairtable.herokuapp.com/
  authorization: string = `?api_key=${apikey}`
  getProjects() {
    console.log(this.apiUrl + this.authorization);
    return this.http.get(this.apiUrl + this.authorization);
  }
}
