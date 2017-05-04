import {InjectionToken} from "@angular/core";
/**
 * Created by edo on 21/04/2017.
 */

export let APP_CONFIG = new InjectionToken("app.config");

let SERVICE_BASE_URL:string = process.env.API_URL;

export const appConfig = {
    'tokenUser': '5asec',
    'tokenPasswd': 'secret',
    'apiLoginUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.security/api/user/login',
    'apiTokenUrl': SERVICE_BASE_URL+'/ajax/5aSec/common/token/create',
    'apiArticleUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.article/api/article/get',
    'apiAllArticleGroupUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.articlegroup/api/articlegroup/get',
    'apiCustomerUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.customer/api/customer/get',
    'apigetMemberUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.customer/api/member/get',
    'apiReportUrl': SERVICE_BASE_URL+'/ajax/5aSec/api/report/pdf',
    'apiAllResponsibilityCenterUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.responsibilitycenter/api/responsibilitycenter/getall/GAK',
    'apiResponsibilityCenterUrl': SERVICE_BASE_URL+'/ajax/ifm.webservice.responsibilitycenter/api/responsibilitycenter/get/GAK'
}
