import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  SignupForm: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.SignupForm = new FormGroup({
      name: new FormControl('', Validators.required),
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
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),

    });
  }

  signup() {
    let userDetails = {
      Name: this.SignupForm.value.name,
      Email: this.SignupForm.value.email,
      Password: this.SignupForm.value.password,
      Gender: this.SignupForm.value.gender,
      PhoneNumber: this.SignupForm.value.phone
    };
    
    if(userDetails.Name == '')
      alert('Please enter your Name!');
     
    if(userDetails.Email == '')
      alert('Please enter your Email!'); 

    if(userDetails.Password == '')
      alert('Please enter your name');

    this.http
      .post('http://127.0.0.1:8000/citizenRegister/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }
}
