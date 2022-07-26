import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): any {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss'],
})
export class AutorizationComponent implements OnInit {
  key: string = 'name';
  myItem: any;
  storeName() {
    localStorage.setItem(this.key, 'name');
    this.myItem = localStorage.getItem(this.key);
  }
  registerUserData = {};

  emailFormControl = new FormControl('name', [
    Validators.required,
    Validators.email,
  ]);
  loginFormControl = new FormControl('', [Validators.required]);
  constructor() {}

  ngOnInit(): void {}
}
