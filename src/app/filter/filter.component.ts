import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() filtered = new EventEmitter<object>()
  submit(f){
    let obj: object = {
      name: f.value.name,
      city: f.value.city,
      country: f.value.country,
      alignment: f.value.alignment
    };
    this.filtered.emit(obj);
  }
}
