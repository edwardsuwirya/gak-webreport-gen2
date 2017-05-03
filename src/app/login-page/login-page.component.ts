import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {AuthenticationService} from "../shared/service/authentication.service";
import {AppTokenService} from "../shared/service/app-token.service";
import {User} from "../shared/model/user";
import {Router} from "@angular/router";
import {MyDateFormatPipe} from "../shared/pipe/my-date-format.pipe";

declare let $:any;
declare let alertify:any;
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    providers: [AuthenticationService, AppTokenService],
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit,AfterViewInit {
    onLogin:boolean = false;
    @ViewChild('userNameInput')
    userNameInput:any;

    todays: Date = new Date();
    user = new User('', '',new MyDateFormatPipe().transform(this.todays,'YYYY-MM-DD'));

    constructor(private router:Router, private authService:AuthenticationService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit():void {
        this.userNameInput.nativeElement.focus();
    }

    login() {
        this.onLogin = true;
        this.authService.login(this.user).subscribe((res) => {
            if (res == false) {
                alertify.error('Failed to login');
            } else {
                this.router.navigate(['home']);
            }
            this.onLogin = false;
        }, ()=> {
            alertify.error('Failed to login');
            this.onLogin = false;
        })

    }

}
