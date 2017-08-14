import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Ui } from './../../utils/ui';
import { CustomValidator } from './../../validators/custom.validator';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private route: Router) {
    this.form = this.fb.group({
      username: ["", Validators.compose([
        Validators.minLength(5),
        //  CustomValidator.EmailValidator,
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ["", Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.required
      ])]
    });



  }

  checkToken() {
    let token = localStorage.getItem("mws.token");
    if (this.dataService.validateToken(token)) {
      this.route.navigateByUrl("/home");
    }
  }
  ngOnInit() {
  }

  showModal() {
    this.ui.setActive("modal");
  }

  hideModal() {
    this.ui.setInactive("modal");
  }

  submit() {
    this.dataService.authenticate(this.form.value)
      .subscribe(result => {
        console.log(result)
        localStorage.setItem("mws.token", result.token)
        localStorage.setItem("mws.user", JSON.stringify(result.user));
        this.route.navigateByUrl("/home");
      }, error => {
        console.log(error)
        this.errors = error.json().errors;
      })
  }
}
