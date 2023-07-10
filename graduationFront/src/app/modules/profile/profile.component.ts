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
  updateProfileAlert: any

  constructor(
    private _profileService: ProfileService,
    private _sideBarToggleService: SideBarToogleService,
    private _loginService: LoginService
  ) { }

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
    const branchLocation = localStorage.getItem('branchLocation')


    this.userData['name'] = name;

    this.userData['password'] = password;

    this.userForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
      ]),
      password: new FormControl('', [
       
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      phoneNumber: new FormControl(phoneNumber, [
        Validators.required,
        Validators.pattern(
          '[0-9]{11}'
        ),
      ]),
      branchLocation: new FormControl(branchLocation, [
        Validators.required,
      ])
    });

    this.userType = userType;

    if (this.userType === 'citizen') {
      const email = localStorage.getItem('email');
      const nationalId = localStorage.getItem('nationalId');

      this.userData['email'] = email;
      this.userData['nationalId'] = nationalId;
      this.userData['phoneNumber'] = phoneNumber;
      console.log("inside if ", this.userData['phoneNumber']);

    } else if (this.userType === 'branchSupervisor') {
      const branchName = localStorage.getItem('branchName');
      const govId = localStorage.getItem('govId');
      this.userData['branchName'] = branchName;
      this.userData['govId'] = govId;
      this.userData['userType'] = 'مدير الفرع';
      this.userData['branchLocation'] = branchLocation
    } else if (this.userType === 'agencySupervisor') {
      const agencyName = localStorage.getItem('agencyName');
      const govId = localStorage.getItem('govId');
      this.userData['agencyName'] = agencyName;
      this.userData['govId'] = govId;
      this.userData['userType'] = 'مدير الجهه';
    }
  }

  saveProfileChanges() {
    if (this.userType == 'citizen') {
      this.saveCitizenProfileChanges()
    }
    else if (this.userType == 'branchSupervisor') { 
      this.saveBranchSupervisorProfileChanges()
    }
    else {
      this.saveAgencySupervisorProfileChanges()
    }
  }

  saveCitizenProfileChanges() {
    if (!this.userForm.valid) {
      this.goToSection('alert')
      this.updateProfileAlert = 1;
      setTimeout(() => {
        this.updateProfileAlert = 0;
      }, 2000);
    }
    else {
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
          if (response == 'Data updated Successfully!!') {
            this.goToSection('alert')
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
  }

  saveBranchSupervisorProfileChanges() {
    console.log(this.userForm.value.branchLocation);
    

    if (this.userType == 'branchSupervisor' && (this.userForm.controls.password.invalid || this.userForm.controls.name.invalid || this.userForm.controls.branchLocation.invalid)) {
      this.goToSection('alert')
      this.updateProfileAlert = 1;
      setTimeout(() => {
        this.updateProfileAlert = 0;
      }, 2000);
    }
    else {

      let updatedUserDetails = {
        govId: this.userData['govId'],
        password: this.userForm.value.password,
        name: this.userForm.value.name,
        branchLocation: this.userForm.value.branchLocation,
      };

      console.log(this.userForm.value.name);

      localStorage.setItem('name', this.userForm.value.name);
      localStorage.setItem('password', this.userForm.value.password);
      localStorage.setItem('branchLocation', this.userForm.value.branchLocation);

      this._profileService.editBranchSupervisor(updatedUserDetails).subscribe(
        (response: any) => {
          console.log(response);
          if (response == 'Data updated Successfully!!') {
            this.goToSection('alert')
            this.showAlert = 1;
            setTimeout(() => {
              this.showAlert = 0;
            }, 2000);
          }
        },
        (error: any) => {
          console.log(error), alert('something wrong');
        }
      );

    }

  }

  saveAgencySupervisorProfileChanges(){

    if (this.userType == 'branchSupervisor' && (this.userForm.controls.password.invalid || this.userForm.controls.name.invalid || this.userForm.controls.branchLocation.invalid)) {
      this.goToSection('alert')
      this.updateProfileAlert = 1;
      setTimeout(() => {
        this.updateProfileAlert = 0;
      }, 2000);
    }
    else {

      let updatedUserDetails = {
        govId: this.userData['govId'],
        password: this.userForm.value.password,
        name: this.userForm.value.name,
      };

      console.log(this.userForm.value.name);

      localStorage.setItem('name', this.userForm.value.name);
      localStorage.setItem('password', this.userForm.value.password);

      this._profileService.editAgencySupervisor(updatedUserDetails).subscribe(
        (response: any) => {
          console.log(response);
          if (response == 'Data updated Successfully!!') {
            this.goToSection('alert')
            this.showAlert = 1;
            setTimeout(() => {
              this.showAlert = 0;
            }, 2000);
          }
        },
        (error: any) => {
          console.log(error), alert('something wrong');
        }
      );
    }


  }
  cancelProfileChanges() {
    this.ngOnInit();
  }

  goToSection(id: any) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log('in else ', id);
    }
  }




}
