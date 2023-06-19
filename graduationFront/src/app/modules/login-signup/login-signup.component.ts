import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { registrationInfo } from '../../shared/utilities/registrationInfo';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  LoginForm: any;
  SignupForm: any;
  type: string = 'citizen';
  stakeHolderSignupInfo: registrationInfo[] = [
    { icon: "fa fa-id-card", placeholder: "الرقم القومي", formControlName: "nationalId" },
    { icon: "fa fa-envelope", placeholder: "البريد الالكتروني", formControlName: "email" },
    { icon: "fa fa-phone", placeholder: "رقم الموبايل", formControlName: "phoneNumber" }
  ];
  stakeHolderLoginInfo: registrationInfo[] = [
    { icon: "fa fa-envelope", placeholder: "البريد الالكتروني", formControlName: "email" },
  ];
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
      supervisiorId: new FormControl('', [
        Validators.required,
      ]),
      adminUsername: new FormControl('', [
        Validators.required,
      ]),
    });

    this.SignupForm = new FormGroup({
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
      name: new FormControl('', [
        Validators.required,
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        // Validators.length(11)
      ]),
      nationalId: new FormControl('', [
        Validators.required,
        Validators.minLength(14),
      ]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
      ]),
      agencyName: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
      ]),
      govId: new FormControl('', [
        Validators.required,
      ]),
      adminUsername: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  citizenLogin() {
    let userDetails = {
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password,
    };

    this.http
      .post('http://127.0.0.1:8000/citizenLogin/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  citizenSignup() {
    let userDetails = {
      name: this.SignupForm.value.name,
      email: this.SignupForm.value.email,
      password: this.SignupForm.value.password,
      phoneNumber: this.SignupForm.value.phoneNumber,
      nationalId: this.SignupForm.value.nationalId,
    };

    this.http
      .post('http://127.0.0.1:8000/citizenSignup/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  branchLogin() {
    let userDetails = {
      govId: this.LoginForm.value.supervisiorId,
      password: this.LoginForm.value.password,
    };

    this.http
      .post('http://127.0.0.1:8000/branchLogin/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  branchSignup() {
    let userDetails = {
      name: this.SignupForm.value.name,
      password: this.SignupForm.value.password,
      govId: this.SignupForm.value.govId,
      branchName: this.SignupForm.value.branchName
    };

    this.http
      .post('http://127.0.0.1:8000/branchSignup/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  agencyLogin() {
    let userDetails = {
      govId: this.LoginForm.value.supervisiorId,
      password: this.LoginForm.value.password,
    };

    this.http
      .post('http://127.0.0.1:8000/agencyLogin/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  agencySignup() {
    let userDetails = {
      name: this.SignupForm.value.name,
      password: this.SignupForm.value.password,
      govId: this.SignupForm.value.govId,
      agencyName: this.SignupForm.value.agencyName
    };

    this.http
      .post('http://127.0.0.1:8000/agencySignup/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  administratorLogin() {
    let userDetails = {
      username: this.LoginForm.value.adminUsername,
      password: this.LoginForm.value.password,
    };

    this.http
      .post('http://127.0.0.1:8000/administratorLogin/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  login() {
    if (this.type === 'citizen') {
      this.citizenLogin();
    }
    else if (this.type === 'branchSupervisior') {
      this.branchLogin();

    } else if (this.type === 'agencySupervisior') {
      this.agencyLogin();
    }
    else if (this.type === 'admin') {
      this.administratorLogin();
    }
  }

  signup() {
    if (this.type === 'citizen') {
      this.citizenSignup();
    }

    else if (this.type === 'branchSupervisior') {
      this.branchSignup();
    } 
    
    else if (this.type === 'agencySupervisior') {
      this.agencySignup();
    }
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

  onSubmit() {

  }

  onLoggedinTypeChange(userType: any): void {
    if (userType.target.value === 'Citizen') {
      this.stakeHolderLoginInfo = [
        { icon: "fa fa-envelope", placeholder: "البريد الالكتروني", formControlName: "email" },
      ];

      this.type = "citizen"
    }
    else if (userType.target.value === 'Branch Supervisor') {
      this.stakeHolderLoginInfo = [
        { icon: "fa fa-id-card", placeholder: "الرقم التعريفي", formControlName: "supervisiorId" },
      ];
      this.type = "branchSupervisior"
    } else if (userType.target.value === 'Agency Supervisor') {
      this.stakeHolderLoginInfo = [
        { icon: "fa fa-id-card", placeholder: "الرقم التعريفي", formControlName: "supervisiorId" },
      ];
      this.type = "agencySupervisior"
    }
    else if (userType.target.value === 'Admin Supervisor') {
      this.stakeHolderLoginInfo = [
        { icon: "fa fa-user", placeholder: "اسم المستخدم", formControlName: "adminUsername" },
      ];
      this.type = "admin"
    }
  }
  onSignedupTypeChange(userType: any): void {
    if (userType.target.value === 'Citizen') {
      this.stakeHolderSignupInfo =
        [{ icon: "fa fa-id-card", placeholder: "الرقم القومي", formControlName: "nationalId" },
        { icon: "fa fa-envelope", placeholder: "البريد الالكتروني", formControlName: "email" },
        { icon: "fa fa-phone", placeholder: "رقم الموبايل", formControlName: "phoneNumber" }]
      this.type = "citizen"

    }
    else if (userType.target.value === 'Agency Supervisor') {
      this.stakeHolderSignupInfo =
        [
          { icon: "fa fa-id-card", placeholder: "الرقم التعريفي", formControlName: "govId" },
          { icon: "fa fa-building", placeholder: "اسم الجهه", formControlName: "agencyName" }
        ]
        this.type = "agencySupervisior"


    } else if (userType.target.value === 'Branch Supervisor') {
      this.stakeHolderSignupInfo =
        [
          { icon: "fa fa-id-card", placeholder: "الرقم التعريفي", formControlName: "govId" },
          { icon: "fa fa-building", placeholder: "اسم الفرع", formControlName: "branchName" }
        ]
        this.type = "branchSupervisior"

    }
  }
}
