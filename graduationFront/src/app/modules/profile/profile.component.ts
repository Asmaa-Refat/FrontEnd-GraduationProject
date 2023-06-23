import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacilityService } from 'src/app/shared/utilities/services/Facility/facility.service';
import { LoginService } from 'src/app/shared/utilities/services/Login/login.service';
import { ProfileService } from 'src/app/shared/utilities/services/Profile/profile.service';
import { SignUpService } from 'src/app/shared/utilities/services/sign-up/sign-up.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: any
  userData: any = {}
  userType : any
  constructor(private _loginService: LoginService, private _profileService: ProfileService) { }

  ngOnInit() {
    
    const name = localStorage.getItem('name');
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');
    const nationalId = localStorage.getItem('nationalId');
    const phoneNumber = localStorage.getItem('phoneNumber');
    const userType = localStorage.getItem('userType')
    
    this.userType = userType

    this.userData['name'] = name;
    this.userData['password'] = password;
    this.userData['email'] = email;
    this.userData['nationalId'] = nationalId;
    this.userData['phoneNumber'] = phoneNumber;

    
    this.userForm = new FormGroup({
      name : new FormControl(name, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(password, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      phoneNumber: new FormControl(phoneNumber, [
        Validators.required,
        Validators.minLength(11),
      ]),
    });
    
  }

  saveProfileChanges(){
    let updatedUserDetails = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      name : this.userForm.value.name,
      phoneNumber : this.userForm.value.phoneNumber
    }

    console.log(this.userForm.value.name);
    
    localStorage.setItem('name', this.userForm.value.name);
    localStorage.setItem('password', this.userForm.value.password);
    localStorage.setItem('email', this.userForm.value.email);
    localStorage.setItem('phoneNumber', this.userForm.value.phoneNumber);

    this._profileService.editProfile(updatedUserDetails).subscribe(
      (response:any) => {
        console.log(response)
      },
      (error) => { console.log(error), alert('something wrong') },
    )

  }
  cancelProfileChanges(){
    this.ngOnInit()
  }








}
