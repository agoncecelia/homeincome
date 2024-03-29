import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  minerData: number;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

   }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile;
    },
    err => {
      console.log(err);
      return false;
    });

    this.authService.getMinerData().subscribe(data => {
      console.log(data);
      this.minerData = data.data;
    });
  }

}
