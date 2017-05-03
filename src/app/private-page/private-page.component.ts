import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';
import {AppTokenService} from '../shared/service/app-token.service';
import {HttpUtilService} from '../shared/service/http-util.service';

@Component({
  selector: 'app-private-page',
  providers: [AuthenticationService, AppTokenService, HttpUtilService],
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.css']
})
export class PrivatePageComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.checkCredentials();
  }

}
