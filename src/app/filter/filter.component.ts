import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiResponseService } from '../api-response.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private api: ApiResponseService) { }

  ngOnInit(): void {
  }

  @Output() filtered = new EventEmitter<object>()
  submit(f){
    let obj: object = {
      city: f.value.city,
      country: f.value.country,
      themes: f.value.themes,
    };
    console.log(obj);
    this.filtered.emit(obj);
  }
}
