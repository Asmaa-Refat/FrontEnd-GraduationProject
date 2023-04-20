import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  LoginForm: any;
  number: number = 4; 
  //container: any = document.querySelector(".container") as HTMLElement;

  constructor(private http: HttpClient) { }

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

  SignUpAnimation(){
    document.getElementsByClassName('container')[0].classList.add("sign-up-mode");
  }

  SignInAnimation(){
    document.getElementsByClassName('container')[0].classList.remove("sign-up-mode");
  }
}
