import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../shared/service/authentication.service";

declare let alertify:any;

@Injectable()
export class HttpUtilService {

    constructor(private router:Router, private authService:AuthenticationService) {
    }

    handleHttpError(error:any, withToken:boolean) {
        if (error) {
            if (withToken) {
                if (error.status != undefined) {
                    if (error.status == 401) {
                        return Observable.throw(401);
                    } else if (error.status == 403) {
                        return Observable.throw(403);
                    }
                }
            }
        }
        console.log("default log for : " + error);
        return Observable.throw(error || 'Server error');
    }

    handleError(err) {
        console.log("handleError: " + err);
        if (err == 401 || err == 403) {
            console.log("error 401 403")
            this.authService.logout();
            alertify.error('Session timeout');
        }
    }
}
