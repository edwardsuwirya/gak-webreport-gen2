import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';
import {AppTokenService} from '../shared/service/app-token.service';

@Component({
  selector: 'app-private-menu-page',
  providers: [AuthenticationService, AppTokenService],
  templateUrl: './private-menu-page.component.html',
  styleUrls: ['./private-menu-page.component.css']
})
export class PrivateMenuPageComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.checkCredentials();
  }

  logout() {
    this.authService.logout();
  }
}
