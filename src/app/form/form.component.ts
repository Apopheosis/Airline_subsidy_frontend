import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {SearchBoxComponent} from "../search-box";
import {BehaviorSubject} from "rxjs";

interface ENTRIES {
  id: number;
  passenger_document_number: string,
  surname: string,
  name: string,
  sender: string,
  validation_status: string,
  time: string,
  type: string,
  ticket_number: string,
  depart_datetime: string,
  airline_code: string,
  city_from_name: string,
  city_to_name: string
  place: string;
}

@Component({templateUrl: 'form.component.html',
styleUrls: ["form.component.css"]})
export class FormComponent implements OnInit{

  Entries: ENTRIES[] | undefined;

  populateTable(data: any) {
    if (data.length==0) {
      (<HTMLTableElement>document.getElementById("entries-table")).hidden = true;
    } else {
      (<HTMLLabelElement>document.getElementById("ErrorLabel")).hidden = true;
      (<HTMLTableElement>document.getElementById("entries-table")).hidden = false;
      (<HTMLButtonElement>document.getElementById('ticket_number')).disabled = true;
      (<HTMLButtonElement>document.getElementById('doc_number')).disabled = true;
      (<HTMLButtonElement>document.getElementById('SaveBtn')).disabled = false;
      this.Entries = data;
    }

  }

  constructor() {
  }


  ngOnInit() {

  }
  }



