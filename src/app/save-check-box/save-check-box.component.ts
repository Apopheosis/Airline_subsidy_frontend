import {Component, OnInit} from '@angular/core'
import FileSaver from "file-saver";
import {HttpClient} from "@angular/common/http";
import {utils, writeFile} from "xlsx";


@Component({
  selector: 'save-check-box',
  templateUrl: './save-check-box.component.html',
  styleUrls: ['./save-check-box.component.css'],
})

export class SaveCheckBoxComponent implements OnInit {
  headers: any = {
    operation_id: "ID операции",
    type: "Тип",
    time: "Время",
    place: "Место покупки",
    sender: "Отправитель",
    transaction_time: "Время транзакции",
    validation_status: "Статус валидации",
    passenger_id: "ID пассажира",
    surname: "Фамилия",
    name: "Имя",
    patronymic: "Отчество",
    birthdate: "Дата рождения",
    gender_id: "ID гендера",
    passenger_document_id: "ID документа пассажира",
    passenger_document_type: "Тип документа пассажира",
    passenger_document_number: "Номер документа пассажира",
    passenger_document_disabled_number: "Номер документа по инвалидности пассажира",
    passenger_document_large_number: "Большой номер документа пассажира",
    passenger_type_id: "ID типа пассажира",
    passenger_type_name: "Тип пассажира",
    passenger_type_type: "Passenger type",
    ra_category: "ra_category",
    description: "Описание",
    is_quota: "Есть квота?",
    ticket_id: "ID билета",
    ticket_number: "Номер билета",
    ticket_type: "Тип билета",
    airline_route_id: "ID маршрута авиалинии",
    airline_code: "Код авиалинии",
    depart_place: "Место отправления",
    depart_datetime: "Время отправления",
    pnr_id: "ID PNR",
    operating_airline_code: "Код оперирующей авиалинии",
    city_from_code: "Код города отправления",
    city_from_name: "Наименование города отправления",
    airport_from_icao_code: "Код аэропорта отправления (Международный)",
    airport_from_rf_code: "Код аэропорта отправления (Россия)",
    airport_from_name: "Наименование аэропорта отправления",
    city_to_code: "Код города прибытия",
    city_to_name: "Наименование города прибытия",
    airport_to_icao_code: "Код аэропорта прибытия (Международный)",
    airport_to_rf_code: "Код аэропорта прибытия (Россия)",
    airport_to_name: "Наименование аэропорта прибытия",
    flight_nums: "Номера полётов",
    fare_code: "fare_code",
    fare_price: "fare_price"
  }

  exportCSVFile(headers: any, items: any, fileTitle: string) {
    items.unshift(headers);
    //var jsonObject = JSON.stringify(items);
    console.log(Object.values(headers));

    var ws = utils.json_to_sheet(items);
    ws["!rows"]?.splice(0);
    var wb = utils.book_new();
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "_"
      + (currentdate.getMonth()+1)  + "_"
      + currentdate.getFullYear() + " _";
    utils.book_append_sheet(wb, ws, "Operations" + datetime);
    writeFile(wb, fileTitle + "_" + datetime + ".xlsx");

  }

  saveDocNumber(val: string, num: string) {

    this.httpService.post("https://localhost:7269/v1/transactions/operations_by_airline_code_doc_number", JSON.stringify({
      code: val,
      number: num
    }), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).subscribe(data => {
      console.log(data);
      this.exportCSVFile(this.headers, data, "report_by_doc_number");
    });
  }

  async saveTicketNumber(val: string, num: string) {
    var allTickets = (<HTMLInputElement>document.getElementById("ticket_number_checkbox")).checked;
    var body = JSON.stringify({
      code: val,
      number: num,
      isAllTickets: allTickets
    });
    this.httpService.post("https://localhost:7269/v1/transactions/operations_by_airline_code_ticket_number", body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).subscribe(data => {
      console.log(data);
      this.exportCSVFile(this.headers, data, "report_by_ticket_number");
    });

  }

  async saveClick(event: any) {
    if ((<HTMLInputElement>document.getElementsByClassName("doc_number")[1]).value != "") {
      let num = (<HTMLInputElement>document.getElementsByClassName("doc_number")[1]).value;
      await this.saveDocNumber(event.value, num);
    }
    if ((<HTMLInputElement>document.getElementsByClassName("ticket_number")[1]).value != "") {
      let num = (<HTMLInputElement>document.getElementsByClassName("ticket_number")[1]).value;
      await this.saveTicketNumber(event.value, num);
    }
  }

  constructor(private httpService: HttpClient) {
  }


  ngOnInit() {
  }
}
