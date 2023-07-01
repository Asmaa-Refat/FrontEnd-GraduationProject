import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { registrationInfo } from '../../shared/utilities/registrationInfo';
import { Router } from '@angular/router';
import { SignUpService } from 'src/app/shared/utilities/services/Sign-up/sign-up.service';
import { LoginService } from 'src/app/shared/utilities/services/Login/login.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  LoginForm: any;
  SignupForm: any;
  type: string = 'citizen';
  userData: any = {};

  stakeHolderSignupInfo: registrationInfo[] = [
    {
      icon: 'fa fa-id-card',
      placeholder: 'الرقم القومي',
      formControlName: 'nationalId',
    },
    {
      icon: 'fa fa-envelope',
      placeholder: 'البريد الالكتروني',
      formControlName: 'email',
    },
    {
      icon: 'fa fa-phone',
      placeholder: 'رقم الموبايل',
      formControlName: 'phoneNumber',
    },
  ];
  stakeHolderLoginInfo: registrationInfo[] = [
    {
      icon: 'fa fa-envelope',
      placeholder: 'البريد الالكتروني',
      formControlName: 'email',
    },
  ];
  constructor(
    private http: HttpClient,
    private _signUpService: SignUpService,
    private _loginService: LoginService,
    private _router: Router
  ) {}

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
      supervisorId: new FormControl('', [Validators.required]),
      adminUsername: new FormControl('', [Validators.required]),
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
      name: new FormControl('', [Validators.required]),
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
      govId: new FormControl('', [Validators.required]),
      adminUsername: new FormControl('', [Validators.required]),
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

    this._signUpService.citizenSignup(userDetails).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  citizenLogin() {
    let userDetails = {
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password,
    };

    this._loginService.citizenLogin(userDetails).subscribe(
      (response) => {
        console.log(response);
        if(response == 'LoggedIn Successfully!!')
        {
          this._loginService.loginToggle(),
          this._loginService.updateUserType('citizen'),
          this.getCitizenByEmail();
        }
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      }
    );
  }

  getCitizenByEmail() {
    this._loginService.getCitizenByEmail(this.LoginForm.value.email).subscribe(
      (response: any) => {
        console.log(response);
        this.userData = response;
        localStorage.setItem('name', response['name']);
        localStorage.setItem('password', response['password']);
        localStorage.setItem('email', response['email']);
        localStorage.setItem('phoneNumber', response['phoneNumber']);
        localStorage.setItem('nationalId', response['nationalId']);
        localStorage.setItem('userType', this.type);
      },
      (error) => {        
        console.log(error), alert('invalid email or password');
      },
      () => {
        this._loginService.updateUserData(this.userData),
          this._router.navigate(['/home']);
      }
    );
  }

  branchSuperSignup() {
    let userDetails = {
      name: this.SignupForm.value.name,
      password: this.SignupForm.value.password,
      govId: this.SignupForm.value.govId,
      branchName: this.SignupForm.value.branchName,
      supervisionType: 'branchSupervisor',
    };
    this._signUpService.branchSignup(userDetails);
  }

  branchSuperLogin() {
    let userDetails = {
      govId: this.LoginForm.value.supervisorId,
      password: this.LoginForm.value.password,
      supervisionType: 'branchSupervisor',
    };

    this._loginService.branchSuperLogin(userDetails).subscribe(
      (response) => {
        console.log(response);
        if(response == 'LoggedIn Successfully!!')
        {
          this._loginService.loginToggle(),
          this._loginService.updateUserType('branchSupervisor'),
          this.getBranchSupervisorById(this.LoginForm.value.supervisorId);
        }
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
    );
  }

  getBranchSupervisorById(id: any) {
    this._loginService.getBranchSupervisorById(id).subscribe(
      (response: any) => {
        console.log(response);
        this.userData = response;
        localStorage.setItem('name', response['name']);
        localStorage.setItem('password', response['password']);
        localStorage.setItem('govId', response['govId']);
        localStorage.setItem('branchName', response['branchName']);
        localStorage.setItem('userType', this.type);
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {
        this._loginService.updateUserData(this.userData),
          this._router.navigate(['/home']);
      }
    );
  }

  agencySuperSignup() {
    let userDetails = {
      name: this.SignupForm.value.name,
      password: this.SignupForm.value.password,
      govId: this.SignupForm.value.govId,
      agencyName: this.SignupForm.value.agencyName,
      supervisionType: 'agencySupervisor',
    };
    this._signUpService.agencySignup(userDetails);
  }

  agencySuperLogin() {
    let userDetails = {
      govId: this.LoginForm.value.supervisorId,
      password: this.LoginForm.value.password,
    };
    this._loginService.agencySuperLogin(userDetails).subscribe(
      (response) => {
        console.log(response);
        if(response == 'LoggedIn Successfully!!')
        {
          this._loginService.loginToggle(),
          this._loginService.updateUserType('agencySupervisor'),
          this.getAgencySupervisorById(this.LoginForm.value.supervisorId);
        }
        
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
    );
  }

  getAgencySupervisorById(id: any) {
    this._loginService.getAgencySupervisorById(id).subscribe(
      (response: any) => {
        console.log(response);
        this.userData = response;
        localStorage.setItem('name', response['name']);
        localStorage.setItem('password', response['password']);
        localStorage.setItem('govId', response['govId']);
        localStorage.setItem('agencyName', response['agencyName']);
        localStorage.setItem('userType', this.type);
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {
        this._loginService.updateUserData(this.userData),
          this._router.navigate(['/home']);
      }
    );
  }

  administratorLogin() {
    let userDetails = {
      username: this.LoginForm.value.adminUsername,
      password: this.LoginForm.value.password,
    };

    this._loginService.administratorLogin(userDetails).subscribe(
      (response) => {
        console.log(response);
        if(response == 'LoggedIn Successfully!!')
        {
          this._loginService.loginToggle(),
          this._loginService.updateUserType('admin'),
          this._router.navigate(['/admin']);
        }
      },
      (error) => {
        console.log(error), alert('invalid username or password');
      },
    );
  }

  login() {
    if (this.type === 'citizen') {
      this.citizenLogin();
    } else if (this.type === 'branchSupervisor') {
      this.branchSuperLogin();
    } else if (this.type === 'agencySupervisor') {
      this.agencySuperLogin();
    } else if (this.type === 'admin') {
      this.administratorLogin();
    }
  }

  signup() {
    if (this.type === 'citizen') {
      this.citizenSignup();
    } else if (this.type === 'branchSupervisor') {
      this.branchSuperSignup();
    } else if (this.type === 'agencySupervisor') {
      this.agencySuperSignup();
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

  onLoggedinTypeChange(userType: any): void {
    if (userType.target.value === 'Citizen') {
      this.stakeHolderLoginInfo = [
        {
          icon: 'fa fa-envelope',
          placeholder: 'البريد الالكتروني',
          formControlName: 'email',
        },
      ];

      this.type = 'citizen';
    } else if (userType.target.value === 'Branch Supervisor') {
      this.stakeHolderLoginInfo = [
        {
          icon: 'fa fa-id-card',
          placeholder: 'الرقم التعريفي',
          formControlName: 'supervisorId',
        },
      ];
      this.type = 'branchSupervisor';
    } else if (userType.target.value === 'Agency Supervisor') {
      this.stakeHolderLoginInfo = [
        {
          icon: 'fa fa-id-card',
          placeholder: 'الرقم التعريفي',
          formControlName: 'supervisorId',
        },
      ];
      this.type = 'agencySupervisor';
    } else if (userType.target.value === 'Admin Supervisor') {
      this.stakeHolderLoginInfo = [
        {
          icon: 'fa fa-user',
          placeholder: 'اسم المستخدم',
          formControlName: 'adminUsername',
        },
      ];
      this.type = 'admin';
    }
  }
  onSignedupTypeChange(userType: any): void {
    if (userType.target.value === 'Citizen') {
      this.stakeHolderSignupInfo = [
        {
          icon: 'fa fa-id-card',
          placeholder: 'الرقم القومي',
          formControlName: 'nationalId',
        },
        {
          icon: 'fa fa-envelope',
          placeholder: 'البريد الالكتروني',
          formControlName: 'email',
        },
        {
          icon: 'fa fa-phone',
          placeholder: 'رقم الموبايل',
          formControlName: 'phoneNumber',
        },
      ];
      this.type = 'citizen';
    } else if (userType.target.value === 'Agency Supervisor') {
      this.stakeHolderSignupInfo = [
        {
          icon: 'fa fa-id-card',
          placeholder: 'الرقم التعريفي',
          formControlName: 'govId',
        },
        {
          icon: 'fa fa-building',
          placeholder: 'اسم الجهه',
          formControlName: 'agencyName',
        },
      ];
      this.type = 'agencySupervisor';
    } else if (userType.target.value === 'Branch Supervisor') {
      this.stakeHolderSignupInfo = [
        {
          icon: 'fa fa-id-card',
          placeholder: 'الرقم التعريفي',
          formControlName: 'govId',
        },
        {
          icon: 'fa fa-building',
          placeholder: 'اسم الفرع',
          formControlName: 'branchName',
        },
      ];
      this.type = 'branchSupervisor';
    }
  }
}
