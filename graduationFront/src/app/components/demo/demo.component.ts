import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  loginForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userType: ['citizen', Validators.required],
      userName: ['', Validators.required],
      password: ['password', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  onUserTypeChange(userType: any): void {
    //console.log(userType.target.value);
    if (userType.target.value === 'citizen') {
      this.loginForm.get('userName').setValidators(Validators.required);
      this.loginForm.get('userName').updateValueAndValidity();
      this.loginForm.patchValue({ password: 'password' });
    } else if (userType.target.value === 'government') {
      this.loginForm.get('userName').setValidators([Validators.required, Validators.pattern('[0-9]+')]);
      this.loginForm.get('userName').updateValueAndValidity();
      this.loginForm.patchValue({ password: 'phone' });
    }
  }
}
