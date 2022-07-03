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
      finalize(() => {
        this.totalRequests--;
        if(this.totalRequests === 0) {
          this.spinner.setLoading(false);
        }
      })
    );
  }
}
