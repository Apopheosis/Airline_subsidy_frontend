import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {Component, Injectable} from '@angular/core';
import { SpinnerComponent } from './spinner.component'

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private loading: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
