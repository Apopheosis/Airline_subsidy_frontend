import {Component, OnInit} from '@angular/core';
import {async} from "@angular/core/testing";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({ templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {

  }
  goToLogin($myParam: string = ''): void {
    this.router.navigate([$myParam]);
  }
  async regClick(username:string, password:string)
  {
    const response = await fetch(environment.apiUrl + "register", {
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
      if (data.ok) this.goToLogin('/login')
      else console.log('failed.')
    });
  }
  ngOnInit() {

    }
}
