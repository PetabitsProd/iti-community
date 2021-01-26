import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = "";
  password = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  model = new LoginFormModel();


  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(({
      username: new FormControl(this.model.username, Validators.compose([Validators.required])),
      password: new FormControl(this.model.password, Validators.compose([Validators.required]))
    }))
  }

  goToRegistration() {
    this.router.navigate(["splash", "register"]);
  }

  submit() {
    this.login();
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      var res = await this.authService.authenticate(this.model.username, this.model.password);
      if(res.success) {
        this.router.navigate(["/"]);
      }
    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }
}
