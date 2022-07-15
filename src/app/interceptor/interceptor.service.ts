import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, finalize, Observable, of, tap} from "rxjs";
import {SpinnerComponent} from "../spinner-overlay/spinner.component";
import {SpinnerOverlayService} from "../spinner-overlay/spinner-overlay.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  private totalRequests = 0;
  constructor(private spinner: SpinnerOverlayService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.spinner.setLoading(true);
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server response. 200')
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 404) {
              (<HTMLLabelElement>document.getElementById("ErrorLabel")).hidden = false;
              (<HTMLTableElement>document.getElementById("entries-table")).hidden = true;
              (<HTMLLabelElement>document.getElementById("ErrorLabel")).innerText = err.error.Message;
              document.getElementsByTagName("save-check-box")[0]["hidden"] = true;
            }
            if (err.status==0) {
              (<HTMLLabelElement>document.getElementById("ErrorLabel")).hidden = false;
              (<HTMLTableElement>document.getElementById("entries-table")).hidden = true;
              (<HTMLLabelElement>document.getElementById("ErrorLabel")).innerText = "База данных недоступна.";
              document.getElementsByTagName("save-check-box")[0]["hidden"] = true;
            }
            if (err.status==500) {
              (<HTMLLabelElement>document.getElementById("ErrorLabel")).hidden = false;
              (<HTMLTableElement>document.getElementById("entries-table")).hidden = true;
              (<HTMLLabelElement>document.getElementById("ErrorLabel")).innerText = "Внутренняя ошибка сервера.";
              document.getElementsByTagName("save-check-box")[0]["hidden"] = true;
            }
          }
        }
      ),
      finalize(() => {
        this.totalRequests--;
        if(this.totalRequests === 0) {
          this.spinner.setLoading(false);
        }
      })
    );
  }
}
