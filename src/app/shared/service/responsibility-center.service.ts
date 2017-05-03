import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {CommonResponse} from "../model/common-response";
import {HttpUtilService} from "./http-util.service";
import {APP_CONFIG} from "../model/application-properties";

@Injectable()
export class ResponsibilityCenterService {


    constructor(private http:Http, private httpUtilService:HttpUtilService, @Inject(APP_CONFIG) private config) {
    }

    getAllResponsibility():Observable<CommonResponse> {
        return this.http.get(this.config.apiAllResponsibilityCenterUrl)
            .map((res:Response) => res.json())
            .catch((error:any) => this.httpUtilService.handleHttpError(error, false));
    }

    getResponsibility(rcCode:string, rcName:string):Observable<CommonResponse> {
        return this.http.get(this.config.apiResponsibilityCenterUrl + '/' + rcCode + '/' + rcName + '/Y')
            .map((res:Response) => res.json())
            .catch((error:any) => this.httpUtilService.handleHttpError(error, false));
    }
}
