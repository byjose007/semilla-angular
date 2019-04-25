import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LoginUser } from '../../models';
import { InputType } from '../../../../shared';

@Component({
  selector: 'c-profile-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  passwordInputType = InputType.password;
  loginForm: FormGroup;

  @Output()
  values = new EventEmitter<LoginUser>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const val = <LoginUser>this.loginForm.value;
    this.values.emit(val);
  }

  togglePasswordInputType() {
    this.passwordInputType =
      this.passwordInputType === InputType.password
        ? InputType.text
        : InputType.password;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      password: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    });
  }

}
