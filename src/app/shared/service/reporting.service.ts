import {Injectable, Inject} from "@angular/core";
import {Http, RequestOptions, Headers, Response, ResponseContentType} from "@angular/http";
import {ReportParam} from "../model/report-param";
import {Observable} from "rxjs";
import {HttpUtilService} from "./http-util.service";
import {APP_CONFIG} from "../model/application-properties";

@Injectable()
export class ReportingService {

    constructor(private http:Http, private httpUtilService:HttpUtilService, @Inject(APP_CONFIG) private config) {
    }

    getReport(reportParam:ReportParam, reportName:string):Observable<void> {
        let validToken = localStorage.getItem('usertoken');

        let headers = new Headers({
            'Accept': 'application/pdf',
            'Content-Type': 'application/json',
            'authentication': validToken
        });

        let options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});

        return this.http.post(this.config.apiReportUrl + '/' + reportName, reportParam, options)
            .map(res => this.extractContent(res, reportName))
            .catch((error:any) => this.httpUtilService.handleHttpError(error, true));
    }

    getTableReport(reportParam:ReportParam, reportName:string):Observable<any> {
        let validToken = localStorage.getItem('usertoken');
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authentication': validToken
        });

        let options = new RequestOptions({headers: headers});

        return this.http.post(this.config.apiReportUrl + '/' + reportName, reportParam, options)
            .map(this.extractData)
            .catch((error:any) => this.httpUtilService.handleHttpError(error, true));

    }

    private extractData(res:Response) {
        let body = res.json();
        return JSON.parse(body.responseDescription) || {};
    }

    private extractContent(res:Response, reportName:string) {
        let blob:Blob = res.blob();
        window['saveAs'](blob, reportName + '.pdf');
    }

    private handleError(error:Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

}
