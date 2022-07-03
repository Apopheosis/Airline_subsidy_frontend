import {Component, OnInit} from '@angular/core'
import FileSaver from "file-saver";
import {HttpClient} from "@angular/common/http";
import {decode, encode, labels} from "windows-1252"

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

  convertToCSV(objArray : any) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  exportCSVFile(headers: any, items: any, fileTitle: string) {
    if (headers) {
      items.unshift(headers);
    }
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(items);
    //"\uFEFF"
    csv = "sep=,\r\n" + csv;
    let csvEnc = encode(csv);

    var exportedFilename = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csvEnc], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, exportedFilename, {autoBom: true});
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
    var body = JSON.stringify({
      code: val,
      number: num
    });
    this.httpService.post("https://localhost:7269/v1/transactions/operations_by_airline_code_ticket_number", body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).subscribe(data => {
      console.log(data);
      this.exportCSVFile(this.headers, data, "report_by_doc_number");
    });

  }

  async saveClick(event: any) {
    if ((<HTMLInputElement>document.getElementsByClassName("doc_number")[0]).value != "") {
      let num = (<HTMLInputElement>document.getElementsByClassName("doc_number")[0]).value;
      await this.saveDocNumber(event.value, num);
    }
    if ((<HTMLInputElement>document.getElementsByClassName("ticket_number")[0]).value != "") {
      let num = (<HTMLInputElement>document.getElementsByClassName("ticket_number")[0]).value;
      await this.saveTicketNumber(event.value, num);
    }
  }

  constructor(private httpService: HttpClient) {
  }


  ngOnInit() {
  }
}
