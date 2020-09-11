import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filterInterface, ApiResponseService } from '../api-response.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() searchCriteriaData = new EventEmitter <filterInterface> ();
    constructor(private apiService: ApiResponseService) {  }

  onSubmit(form: NgForm) {
    let searchCriteria = {
      name: form.value.name

    }
    this.searchCriteriaData.emit(searchCriteria)
    console.log(form.value.name);
  }

  ngOnInit(): void {
  }

}
