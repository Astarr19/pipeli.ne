import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponseService } from '../api-response.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private api:ApiResponseService) { }

  @Input() formStatus: boolean;
  @Input() selected: string;
  ngOnInit(): void {
  }

  submitEdit(f: NgForm) {
    let newItem = {
      "Company Name": f.value.companyName,
      "City": f.value.city,
      "Country": f.value.country,
      "Two Line Company Summary": f.value.summary,
      "Review Date": f.value.review,
      "Scout": f.value.scout,
      "Company Website": f.value.website,
      "Alignment": f.value.alignment,
      "Themes": f.value.themes,
      "Uniqueness": f.value.uniqueness,
      "Team": f.value.team,
      "Raised": f.value.raised
    }
    this.api.updateProject(this.selected, newItem).subscribe
  }

}
