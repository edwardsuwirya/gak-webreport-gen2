import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {HttpUtilService} from "./http-util.service";
import {APP_CONFIG} from "../model/application-properties";

@Injectable()
export class CustomerService {


    constructor(private http:Http, private httpUtilService:HttpUtilService, @Inject(APP_CONFIG) private config) {
    }

    getCustomer(companyCode:string, customerCode:string, customerName:string, customerResponsibilityCenterCode:string) {
        return this.http.get(this.config.apiCustomerUrl + "/" + companyCode + "/" + customerCode + "/" + customerName + "/" + customerResponsibilityCenterCode + "/Y")
            .map((res:Response) => res.json())
            .catch((error:any) => this.httpUtilService.handleHttpError(error, false));
    }

    getMember(companyCode:string, memberCode:string, memberName:string, memberResponsibilityCenterCode:string, memberTypeCode:string) {
        return this.http.get(this.config.apiMemberUrl + "/" + companyCode + "/" + memberCode + "/" + memberName + "/" + memberResponsibilityCenterCode + "/" + memberTypeCode + "/Y")
            .map((res:Response) => res.json())
            .catch((error:any) => this.httpUtilService.handleHttpError(error, false));
    }
}
