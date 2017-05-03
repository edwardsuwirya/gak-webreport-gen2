import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";
import {HttpUtilService} from "./http-util.service";
import {APP_CONFIG} from "../model/application-properties";

@Injectable()
export class ArticleService {

    constructor(private http:Http, private httpUtilService:HttpUtilService, @Inject(APP_CONFIG) private config) {
    }

    getArticle(companyCode:string, articleCode:string, articleName:string, articleGroupCode:string) {
        return this.http.get(this.config.apiArticleUrl + "/" + companyCode + "/" + articleCode + "/" + articleName + "/" + articleGroupCode + "/Y")
            .map((res:Response) => res.json())
            .catch((error:any) => this.httpUtilService.handleHttpError(error, false));
    }

}
