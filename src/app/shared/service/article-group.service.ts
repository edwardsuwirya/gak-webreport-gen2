import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {HttpUtilService} from "./http-util.service";
import {APP_CONFIG} from "../model/application-properties";

@Injectable()
export class ArticleGroupService {

    constructor(private http:Http, private httpUtilService:HttpUtilService, @Inject(APP_CONFIG) private config) {
    }

    getArticleGroup(companyCode:string) {
        return this.http.get(this.config.apiAllArticleGroupUrl + "/" + companyCode + '/%25%25/%25%25/%25%25/Y')
            .map((res:Response) => res.json())
            .catch((error:any) => this.httpUtilService.handleHttpError(error, false));
    }
}
