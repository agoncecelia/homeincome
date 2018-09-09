import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-success', timeout: 3500});
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }
}
