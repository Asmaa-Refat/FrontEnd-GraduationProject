import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  LoginForm: any;
  type:string = 'citizen';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      SupervisiorId: new FormControl('', [
        Validators.required,
      ]),
      adminUsername: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  login() {
    let userDetails = {
      Email: this.LoginForm.value.email,
      Password: this.LoginForm.value.password,
    };

    this.http
      .post('http://127.0.0.1:8000/citizenLogin/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  SignUpAnimation() {
    document
      .getElementsByClassName('container')[0]
      .classList.add('sign-up-mode');
  }

  SignInAnimation() {
    document
      .getElementsByClassName('container')[0]
      .classList.remove('sign-up-mode');
  }

  onSubmit(){
    
  }

  onUserTypeChange(userType: any): void {
    if (userType.target.value === 'Citizen'){
      this.type = "citizen"
    }
    else if (userType.target.value === 'Branch Supervisor' || userType.target.value === 'Agency Supervisor') {
      this.type = "supervisiorId"
    } else if (userType.target.value === 'Admin Supervisor') {
      this.type = "admin"
    }
  }
}
