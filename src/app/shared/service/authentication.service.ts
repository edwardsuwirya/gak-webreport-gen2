import {Injectable} from "@angular/core";
import {MyToken} from "../model/my-token";
import {Router} from "@angular/router";
import {AppTokenService} from "./app-token.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthenticationService {
    mytoken:MyToken;

    constructor(private router:Router, private appToken:AppTokenService) {
    }

    login(user):Observable<boolean> {

        return Observable.create((obs) => {
            this.appToken.getToken(user).subscribe(
                data => {
                    this.mytoken = data;
                    if (this.mytoken.token) {
                        localStorage.setItem("usertoken", this.mytoken.token);
                        obs.next(true);
                    } else {
                        obs.next(false);
                    }
                },
                error => {
                    obs.next(false);
                }
            );
        });

    }

    logout() {
        localStorage.removeItem("usertoken");
        this.router.navigate(['login']);
    }

    checkCredentials() {
        if (localStorage.getItem("usertoken") === null) {
            this.router.navigate(['login']);
        }
    }
}
