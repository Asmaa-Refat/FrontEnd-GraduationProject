import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/utilities/services/Login/login.service';
import { ProfileService } from 'src/app/shared/utilities/services/Profile/profile.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: any;
  userData: any = {};
  userType: any;
  isOpen$ = this._sideBarToggleService.isOpen$;
  showAlert: any = -1;

  constructor(
    private _profileService: ProfileService,
    private _sideBarToggleService : SideBarToogleService,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    this.isOpen$.subscribe(isOpen => {
      const mainContentElement = document.getElementById('main-content') as HTMLElement;
        mainContentElement.style.transform = 'none';
        mainContentElement.style.width = '60%';
      
    });


    const name = localStorage.getItem('name');
    const password = localStorage.getItem('password');
    const userType = localStorage.getItem('userType');
    const phoneNumber = localStorage.getItem('phoneNumber');

    this.userData['name'] = name;

    this.userData['password'] = password;

    this.userForm = new FormGroup({
      name: new FormControl(name, [
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

    this.userType = userType;

    if (this.userType === 'citizen') {
      const email = localStorage.getItem('email');
      const nationalId = localStorage.getItem('nationalId');

      this.userData['email'] = email;
      this.userData['nationalId'] = nationalId;
      this.userData['phoneNumber'] = phoneNumber;
      console.log("inside if ",this.userData['phoneNumber']);
      
    } else if (this.userType === 'branchSupervisor') {
      const branchName = localStorage.getItem('branchName');
      const govId = localStorage.getItem('govId');
      this.userData['branchName'] = branchName;
      this.userData['govId'] = govId;
      this.userData['userType'] = 'مدير الفرع';
    } else if (this.userType === 'agencySupervisor') {
      const agencyName = localStorage.getItem('agencyName');
      const govId = localStorage.getItem('govId');
      this.userData['agencyName'] = agencyName;
      this.userData['govId'] = govId;
      this.userData['userType'] = 'مدير الجهه';
    }
  }

  saveProfileChanges() {
    let updatedUserDetails = {
      email: this.userData['email'],
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      phoneNumber: this.userForm.value.phoneNumber,
    };

    console.log(this.userForm.value.name);

    localStorage.setItem('name', this.userForm.value.name);
    localStorage.setItem('password', this.userForm.value.password);
    localStorage.setItem('phoneNumber', this.userForm.value.phoneNumber);

    this._profileService.editProfile(updatedUserDetails).subscribe(
      (response: any) => {
        console.log(response);
        if(response == 'Data updated Successfully!!') 
        {
          this.showAlert = 1;
          setTimeout(() => {
            this.showAlert = 0;
          }, 2000);
        }
      },
      (error) => {
        console.log(error), alert('something wrong');
      }
    );
  }
  cancelProfileChanges() {
    this.ngOnInit();
  }

}
