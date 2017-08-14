import { CustomValidator } from './../../validators/custom.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ui } from './../../utils/ui';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-singup-page',
  templateUrl: './singup-page.component.html',
  styleUrls: ['./singup-page.component.scss'],
  providers: [Ui, DataService]
})
export class SingupPageComponent implements OnInit {

  public form: FormGroup;
  public errors: any[] = [];
  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private route: Router) {
    this.form = this.fb.group({
      firstName: ["", Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      lastName: ["", Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      email: ["", Validators.compose([
        Validators.minLength(5),
        CustomValidator.EmailValidator,
        Validators.maxLength(160),
        Validators.required
      ])],
      document: ["", Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(17),
        Validators.required
      ])],
      username: ["", Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ["", Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ])],
      confirmPassword: ["", Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }


  ngOnInit() {
  }

  submit() {
    this.dataService.createUser(this.form.value).subscribe(result => {
      alert("Bem vindo ao Modern Web Store");
      this.route.navigateByUrl("/");
    }, error => {
      console.log(error);
      this.errors = error.json().errors;
    });
  }
}
