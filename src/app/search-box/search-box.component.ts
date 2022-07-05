import {Component, EventEmitter, Injectable, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, catchError, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tick} from "@angular/core/testing";

@Component({ selector: "app-search-box",
  templateUrl: 'search-box.component.html',
styleUrls: ["search-box.component.css"]})
export class SearchBoxComponent implements OnInit {
  arrEntries: any;
  @Input() title: String;
  @Input() placeholder: String;
  @Input() buttonText: String;
  @Input() functionType: String;
  @Output() docNumber = new EventEmitter<any>();
  @Output() ticketNumber = new EventEmitter<any>();

  decideFunction() {
    if (this.functionType=='doc_number') this.onDocNumber()
    else this.onTicketNumber();
  }

  InputValidation(event: any) {
    var val = event.target.value;
    var label = (<HTMLLabelElement>document.getElementById(this.functionType + '_label'));

    if (this.functionType==="ticket_number") {
      if (!val.match("^[a-zA-Z0-9]{13}$")) {
        label.hidden = false;
        this.blockInput(true);
      } else {
        label.hidden = true;
        this.blockInput(false);
      }
    }
  }

  blockSave() {
    (<HTMLButtonElement>document.getElementById('ticket_number')).disabled = false;
    (<HTMLButtonElement>document.getElementById('doc_number')).disabled = false;
    (<HTMLButtonElement>document.getElementById('SaveBtn')).disabled = true;
  }

  clearInput() {
    if (this.functionType=='doc_number') {
      (<HTMLInputElement>document.getElementsByClassName("ticket_number")[0]).value = "";
    }
    if (this.functionType=='ticket_number') {
      (<HTMLInputElement>document.getElementsByClassName("doc_number")[0]).value = "";
    }
  }

  blockInput(token: boolean = true) {
    this.blockSave();
    if (!token) {
      (<HTMLInputElement>document.getElementsByClassName('ticket_number')[0]).disabled = false;
      (<HTMLButtonElement>document.getElementById('ticket_number')).disabled = false;
      (<HTMLInputElement>document.getElementsByClassName('doc_number')[0]).disabled = false;
      (<HTMLButtonElement>document.getElementById('doc_number')).disabled = false;
    }
    else {
      if (this.functionType=='doc_number') {
        (<HTMLButtonElement>document.getElementById('ticket_number')).disabled = true;
      } else {
        (<HTMLInputElement>document.getElementsByClassName('doc_number')[0]).disabled = true;
        (<HTMLButtonElement>document.getElementById('doc_number')).disabled = true;
        (<HTMLButtonElement>document.getElementById('ticket_number')).disabled = true;
      }
    }
  }

  async onDocNumber() {
    var doc_number = (<HTMLInputElement>document.getElementsByClassName(this.functionType.toString())[1]).value;
    console.log(doc_number)
    var allTickets = (<HTMLInputElement>document.getElementById("ticket_number_checkbox")).checked;
    this.httpService.post("https://localhost:7269/v1/transactions/by_doc_number/", {
        number: doc_number,
        isAllTickets: allTickets
    }, {headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    ).subscribe(
      data => {
        if (data.toString()=='[]') {
          prompt("No such entries.");
        } else {
          this.docNumber.emit(data);
        }
      }
    );
  }
  async onTicketNumber() {
    var ticket_number = (<HTMLInputElement>document.getElementsByClassName("ticket_number")[1]).value;
    var allTickets = (<HTMLInputElement>document.getElementById("ticket_number_checkbox")).checked;
    console.log(allTickets);
    this.httpService.post("https://localhost:7269/v1/transactions/by_ticket_number/", {
      number: ticket_number,
      isAllTickets: allTickets
    }, {headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
          }
    }).subscribe((data) => {
      if (data.toString()=='[]') {
        prompt("No such entries.");
      } else {
        this.ticketNumber.emit(data);
      }
    });

  }

  constructor(title: String, placeholder: String, buttonText: String, type: String, private httpService: HttpClient) {
    this.title = title;
    this.placeholder = placeholder;
    this.buttonText = buttonText;
    this.functionType = type;
  }
  ngOnInit() {
  }
  ngOnChanges(changes: any) {
  }
}
