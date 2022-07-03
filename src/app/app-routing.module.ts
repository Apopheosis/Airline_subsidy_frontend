import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from './form/form.component'
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login";
import {RegisterComponent} from "./register";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: AppComponent},
  {path: 'form', component: FormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
