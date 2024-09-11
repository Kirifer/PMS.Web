import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrl: './login-signin.component.css'
})
export class LoginSigninComponent {
  constructor(private router:Router){}
  title = 'Login-Page';
  hide = true;
  isSignDivVisiable: boolean = true;
  isPasswordVisible = false;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  toggleVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  flipCard() {
    const card = document.getElementById('flip-card-inner');
    card?.classList.toggle('flipped');
  }

  onRegister(signUpForm: any) {
    if (signUpForm.valid) {
      const localUser = localStorage.getItem('CompanyAdmins');
      if (localUser != null) {
        const users = JSON.parse(localUser);
        users.push(this.signUpObj);
        localStorage.setItem('CompanyAdmins', JSON.stringify(users));
      } else {
        const users = [];
        users.push(this.signUpObj);
        localStorage.setItem('CompanyAdmins', JSON.stringify(users));
      }
      alert('Registration Successful');
      
      // Clear the form after successful registration
      this.signUpObj = new SignUpModel();
      signUpForm.resetForm();
    } else {
      alert('Please fill out all fields');
    }
  }

  onLogin(signInForm: any) {
    if (signInForm.valid) {
      const localUsers = localStorage.getItem('CompanyAdmins');
      if (localUsers != null) {
        const users = JSON.parse(localUsers);
        const isUserPresent = users.find((user: SignUpModel) => user.username === this.loginObj.username && user.password === this.loginObj.password);
        if (isUserPresent != undefined) {
          alert('Redirecting you to the Dashboard..');
          localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('No User Found');
        }
      }
      // Clear the form after login attempt
      this.loginObj = new LoginModel();
      signInForm.resetForm();
    } else {
      alert('Please fill out all fields');
    }
  }
}

export class SignUpModel {
  name: string;
  username: string;
  password: string;

  constructor() {
    this.name = "";
    this.username = "";
    this.password = "";
  }
}

export class LoginModel {
  name: string;
  username: string;
  password: string;

  constructor() {
    this.name = "";
    this.username = "";
    this.password = "";
  }

  
}
