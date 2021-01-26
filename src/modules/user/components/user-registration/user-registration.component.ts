import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;
  registerForm: FormGroup;
  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { 
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    // We need this to get the registerForm.invalid
    {
      validators: this.equals('password', 'confirmPassword')
    })
  }

  ngOnInit(): void {
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.registerForm.invalid || this.model.password !== this.model.confirmPassword) {
      return;
    }
    
    // TODO Enregistrer l'utilisateur via le UserService
    this.userService.register(this.model.username, this.model.password);
    this.goToLogin();
  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(["splash", "login"]);
  }

  private equals = (pathA: string, pathB: string, errorKey: string = 'missmatch') => {
    return (abstractControl: AbstractControl): null | void => {
      const abstractControlA = abstractControl.get(pathA);
      const abstractControlB = abstractControl.get(pathB);

      if (abstractControlA && abstractControlB) {
        const valueA = abstractControlA.value;
        const valueB = abstractControlB.value;

        if (valueA !== null && valueA !== undefined && valueA === valueB) {
          return null;
        }

        abstractControlB.setErrors({ [errorKey]: true });
      }
    };
  };
}
