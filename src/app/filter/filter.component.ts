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
      // name: f.value.name,
      // review: f.value["review_date"],
      // date: f.value["date_added"],
      // scout: f.value.scout,
      // source: f.value.source,
      city: f.value.city,
      // state: f.value["state_province"],
      country: f.value.country,
      //alignment: encodeURI(`{Alignment}=${f.value.alignment}`),
      themes: f.value.themes,
      // technology: f.value["technology_area"],
      // landscape: encodeURI(`{Country}=${f.value["landscape"]}`),
      // uniqueness: f.value["uniqueness"],
      // team: f.value["team"],
      // raised: f.value["raised"],
      // stage: f.value["stage"]
    };
    console.log(obj);
    this.filtered.emit(obj);
  }
}
