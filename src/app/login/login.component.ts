import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  isRegisterMode = false;

  loginForm = {
    username: '',
    password: ''
  };

  registerForm = {
    username: '',
    email: '',
    password: ''
  };

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onLogin() {
    console.log("Login form submitted:", this.loginForm);
    // Add actual login logic here
  }

  onRegister() {
    console.log("Register form submitted:", this.registerForm);
    // Add actual registration logic here
  }

}




// constructor(private router:Router){}
//   title = 'Login-Page';
//   hide = true;
//   isSignDivVisiable: boolean = true;
//   isPasswordVisible = false;

//   signUpObj: SignUpModel = new SignUpModel();
//   loginObj: LoginModel = new LoginModel();

//   toggleVisibility() {
//     this.isPasswordVisible = !this.isPasswordVisible;
//   }

//   flipCard() {
//     const card = document.getElementById('flip-card-inner');
//     card?.classList.toggle('flipped');
//   }

//   onRegister(signUpForm: any) {
//     if (signUpForm.valid) {
//       const localUser = localStorage.getItem('CompanyAdmins');
//       if (localUser != null) {
//         const users = JSON.parse(localUser);
//         users.push(this.signUpObj);
//         localStorage.setItem('CompanyAdmins', JSON.stringify(users));
//       } else {
//         const users = [];
//         users.push(this.signUpObj);
//         localStorage.setItem('CompanyAdmins', JSON.stringify(users));
//       }
//       alert('Registration Successful');
      
//       // Clear the form after successful registration
//       this.signUpObj = new SignUpModel();
//       signUpForm.resetForm();
//     } else {
//       alert('Please fill out all fields');
//     }
//   }

//   onLogin(signInForm: any) {
//     if (signInForm.valid) {
//       const localUsers = localStorage.getItem('CompanyAdmins');
//       if (localUsers != null) {
//         const users = JSON.parse(localUsers);
//         const isUserPresent = users.find((user: SignUpModel) => user.username === this.loginObj.username && user.password === this.loginObj.password);
//         if (isUserPresent != undefined) {
//           alert('Redirecting you to the Dashboard..');
//           localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
//           this.router.navigateByUrl('/dashboard');
//         } else {
//           alert('No User Found');
//         }
//       }
//       // Clear the form after login attempt
//       this.loginObj = new LoginModel();
//       signInForm.resetForm();
//     } else {
//       alert('Please fill out all fields');
//     }
//   }
// }




// export class SignUpModel {
//   name: string;
//   username: string;
//   password: string;

//   constructor() {
//     this.name = "";
//     this.username = "";
//     this.password = "";
//   }
// }

// export class LoginModel {
//   name: string;
//   username: string;
//   password: string;

//   constructor() {
//     this.name = "";
//     this.username = "";
//     this.password = "";
//   }