import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {User} from "../model/user";
import {Observable} from "rxjs/Rx";
import {MyToken} from "../model/my-token";
import {UserToken} from "../model/user-token";
import {CommonResponse} from "../model/common-response";
import {APP_CONFIG} from "../model/application-properties";

@Injectable()
export class AppTokenService {
    constructor(private http:Http, @Inject(APP_CONFIG) private config) {
    }

    getToken(body:User):Observable<MyToken> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, method: 'post'});
        return this.http.post(this.config.apiLoginUrl, body, options).flatMap((res)=> {
            let response:CommonResponse = res.json();
            if (response.responseCode === '0') {
                return this.http.post(this.config.apiTokenUrl, new UserToken(this.config.tokenUser, this.config.tokenPasswd, ''), options);
            } else {
                Observable.throw('Unauthorized');
            }
        }).map(res => res.json()).catch((error:any) => Observable.throw(error || 'Server error'));
    }

}
