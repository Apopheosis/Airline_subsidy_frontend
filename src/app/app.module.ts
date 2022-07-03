import { NgModule } from '@angular/core';
import {BrowserModule, provideProtractorTestingSupport} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoginComponent} from "./login";
import {RegisterComponent} from "./register";
import {SidePanelComponent} from "./side-panel/side-panel.component";
import {SearchBoxComponent} from "./search-box";
import {SaveCheckBoxComponent} from "./save-check-box/save-check-box.component";
import {SpinnerComponent} from "./spinner-overlay/spinner.component";
import {InterceptorService} from "./interceptor/interceptor.service";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    RegisterComponent,
    SidePanelComponent,
    SearchBoxComponent,
    SaveCheckBoxComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    OverlayModule,
    PortalModule
  ],
  providers: [ {provide: String, useValue: "dummy"},
    SearchBoxComponent,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SpinnerComponent
  ]

})
export class AppModule { }
