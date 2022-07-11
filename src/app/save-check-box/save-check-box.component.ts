import {Component, OnInit} from '@angular/core'
import FileSaver from "file-saver";
import {HttpClient} from "@angular/common/http";
import {utils, writeFile} from "xlsx";
import {environment} from "../../environments/environment";

interface Airlines {
  name: string,
  iata_code: string
}

@Component({
  selector: 'save-check-box',
  templateUrl: './save-check-box.component.html',
  styleUrls: ['./save-check-box.component.css'],
})

export class SaveCheckBoxComponent implements OnInit {
  airlines: Airlines[] | any;

  httpHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

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
    arrive_place: "Место прибытия",
    arrive_datetime: "Время прибытия",
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

  ec(r: any, c: any){
    return utils.encode_cell({r:r,c:c});
  }

  delete_row(ws: any, row_index: any) {
    var variable = utils.decode_range(ws["!ref"])
    for (var R = row_index; R < variable.e.r; ++R) {
      for (var C = variable.s.c; C <= variable.e.c; ++C) {
        ws[this.ec(R, C)] = ws[this.ec(R + 1, C)];
      }
    }
  }

  AdjustColumnWidth(worksheet: any) {
    console.log('i am here');
    worksheet["!cols"].forEach(function (column: any, i: any) {
      if(i!==0)
      {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell: any) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });
  }

  exportCSVFile(headers: any, items: any, fileTitle: string) {
    items.unshift(headers);
    var ws = utils.json_to_sheet(items);
    this.delete_row(ws, 0);
    this.AdjustColumnWidth(ws);
    var wb = utils.book_new();
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "_"
      + (currentdate.getMonth()+1)  + "_"
      + currentdate.getFullYear() + " _";
    utils.book_append_sheet(wb, ws, "Operations" + datetime);
    writeFile(wb, fileTitle + "_" + datetime + ".xlsx");

  }

  saveDocNumber(val: string, num: string) {

    this.httpService.post(environment.apiUrl + "operations_by_airline_code_doc_number", JSON.stringify({
      code: val,
      number: num
    }), {
      headers: this.httpHeaders
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
    this.httpService.post(environment.apiUrl + "operations_by_airline_code_ticket_number", body, {
      headers: this.httpHeaders
    }).subscribe(data => {
      console.log(data);
      this.exportCSVFile(this.headers, data, "report_by_ticket_number");
    });

  }

  async saveClick() {
    let value = (<HTMLSelectElement>document.getElementById("airlineSelect")).value;
    if ((<HTMLInputElement>document.getElementsByClassName("doc_number")[1]).value != "") {
      let num = (<HTMLInputElement>document.getElementsByClassName("doc_number")[1]).value;
      await this.saveDocNumber(value, num);
    }
    if ((<HTMLInputElement>document.getElementsByClassName("ticket_number")[1]).value != "") {
      let num = (<HTMLInputElement>document.getElementsByClassName("ticket_number")[1]).value;
      await this.saveTicketNumber(value, num);
    }
  }

  constructor(private httpService: HttpClient) {
  }


  ngOnInit() {
    this.httpService.post(environment.apiUrl + "get_all_airlines", {}, {
      headers: this.httpHeaders
    }).subscribe(data => {
      console.log(data);
      this.airlines = data;
    })
  }
}
