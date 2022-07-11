import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {
  }
  goToForm($myParam: string = ''): void {
    this.router.navigate([$myParam]);
  }
  async loginClick(username:string, password:string) {
    const response = await fetch(environment.apiUrl + "login", {
      method: "POST",
      body: JSON.stringify({
        login: username,
        password: password
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(data => {
      if (data.ok) this.goToForm('/form')
      else {
        console.log('Failed.');
      }
    });

  }
  ngOnInit() {
  }
}
