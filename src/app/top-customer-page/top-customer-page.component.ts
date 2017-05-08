import {Component, OnInit, ViewChild, Inject} from "@angular/core";
import {AuthenticationService} from "../shared/service/authentication.service";
import {ReportingService} from "../shared/service/reporting.service";
import {Subscription} from "rxjs";
import {ReportParam} from "../shared/model/report-param";
import {MyDatePickerComponent} from "../shared/component/my-date-picker/my-date-picker.component";
import {ResponsibilityCenter} from "../shared/model/responsibility-center";
import {Article} from "../shared/model/article";
import {Customer} from "../shared/model/customer";
import {CustomerService} from "../shared/service/customer.service";
import {ResponsibilityCenterService} from "../shared/service/responsibility-center.service";
import {HttpUtilService} from "../shared/service/http-util.service";
import {APP_CONFIG} from "../shared/model/application-properties";
import {User} from "../shared/model/user";

declare let $: any;
declare let alertify: any;

@Component({
    selector: 'app-top-customer-page',
    providers: [ReportingService, CustomerService, ResponsibilityCenterService],
    templateUrl: './top-customer-page.component.html',
    styleUrls: ['./top-customer-page.component.css']
})
export class TopCustomerPageComponent implements OnInit {
    ddformat: string = 'DD MMM YYYY';
    labelDateText: string = 'Date';
    dateId1: string = 'date1';
    dateId2: string = 'date2';
    sDate1: string;
    sDate2: string;
    sRC1: string;
    sRC2: string;
    sArticle1: string;
    sArticle2: string;
    sCustomer1: string;
    sCustomer2: string;
    sRCCustomerBase1: string;
    sRCCustomerBase2: string;
    sType: string;
    isDisabledForProcess: boolean = false;

    rcName1: string;
    rcName2: string;
    articleName1: string;
    articleName2: string;
    customerName1: string;
    customerName2: string;
    customerBaseName1: string;
    customerBaseName2: string;

    @ViewChild('date2')
    private datePicker2: MyDatePickerComponent;

    mySub: Subscription;
    activeUser: User;

    errorMessage: string = 'An error occured';

    constructor(private authService: AuthenticationService,
                private reportingService: ReportingService,
                private httpUtilService: HttpUtilService,
                @Inject(APP_CONFIG) private appConfig) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
        this.activeUser = this.authService.activeUser;
    }

    openPopUp(id) {
        $(id).openModal();
    }

    doClearForm() {
        this.doClearResponsibility();
        this.doClearArticle();
        this.doClearCustomer();
        this.doClearCustomerBase();
        return false;
    }

    doClearCustomer() {
        this.sCustomer1 = '';
        this.sCustomer2 = '';
        this.customerName1 = '';
        this.customerName2 = '';
    }

    doClearArticle() {
        this.sArticle1 = '';
        this.sArticle2 = '';
        this.articleName1 = '';
        this.articleName2 = '';
    }

    doClearResponsibility() {
        this.sRC1 = '';
        this.sRC2 = '';
        this.rcName1 = '';
        this.rcName2 = '';
    }

    doClearCustomerBase() {
        this.sRCCustomerBase1 = '';
        this.sRCCustomerBase2 = '';
        this.customerBaseName1 = '';
        this.customerBaseName2 = '';
    }

    logout() {
        this.authService.logout();
    }

    cancelReport() {
        if (this.mySub) {
            this.mySub.unsubscribe();
            this.isDisabledForProcess = false;
        }

    }

    dateValChange(id: string, val) {
        if (id === '1') {
            this.sDate1 = val;
            this.sDate2 = val;
            this.datePicker2.setAnotherDate(new Date(val));
        } else {
            this.sDate2 = val;
        }
    }

    onRCSelection1(event: ResponsibilityCenter) {
        this.sRC1 = event.s_responsibilityCenterCode;
        this.rcName1 = event.s_responsibilityCenterName;
        this.sRC2 = this.sRC1;
        this.rcName2 = this.rcName1;

    }

    onRCSelection2(event: ResponsibilityCenter) {
        this.sRC2 = event.s_responsibilityCenterCode;
        this.rcName2 = event.s_responsibilityCenterName;
    }

    onArticleSelection1(event: Article) {
        this.sArticle1 = event.s_articleRealCode;
        this.articleName1 = event.s_articleName;
        this.sArticle2 = this.sArticle1;
        this.articleName2 = this.articleName1;
    }

    onArticleSelection2(event: Article) {
        this.sArticle2 = event.s_articleRealCode;
        this.articleName2 = event.s_articleName;
    }

    onCustomerSelection1(event: Customer) {
        this.sCustomer1 = event.s_customerCode;
        this.customerName1 = event.s_customerName;
        this.sCustomer2 = this.sCustomer1;
        this.customerName2 = this.customerName1;
    }

    onCustomerSelection2(event: Customer) {
        this.sCustomer2 = event.s_customerCode;
        this.customerName2 = event.s_customerName;
    }

    onCustomerBase1(event: ResponsibilityCenter) {
        this.sRCCustomerBase1 = event.s_responsibilityCenterCode;
        this.customerBaseName1 = event.s_responsibilityCenterName;
        this.sRCCustomerBase2 = this.sRCCustomerBase1;
        this.customerBaseName2 = this.customerBaseName1;
    }

    onCustomerBase2(event: ResponsibilityCenter) {
        this.sRCCustomerBase2 = event.s_responsibilityCenterCode;
        this.customerBaseName2 = event.s_responsibilityCenterName;
    }

    createReport(reportType: number) {
        if (this.sDate1 === null || this.sDate1 === undefined || this.sDate2 === null || this.sDate2 === undefined
            || this.sRC1 === null || this.sRC1 === undefined || this.sRC2 === null || this.sRC2 === undefined
            || this.sRCCustomerBase1 === null || this.sRCCustomerBase1 === undefined
            || this.sRCCustomerBase2 === null || this.sRCCustomerBase2 === undefined) {
            this.errorMessage = this.appConfig.mandatoryErrorMessage;
            alertify.error(this.errorMessage);
        } else {
            let reportParam = new ReportParam();
            reportParam.sCompanyCode = this.appConfig.companyCode;
            reportParam.sDate1 = this.sDate1;
            reportParam.sDate2 = this.sDate2;
            reportParam.sRC1 = this.sRC1;
            reportParam.sRC2 = this.sRC2;
            reportParam.sArticle1 = (this.sArticle1 === null || this.sArticle1 === undefined) ? '' : this.sArticle1;
            reportParam.sArticle2 = (this.sArticle2 === null || this.sArticle2 === undefined) ? '' : this.sArticle2;
            reportParam.sCustomer1 = (this.sCustomer1 === null || this.sCustomer1 === undefined) ? '' : this.sCustomer1;
            reportParam.sCustomer2 = (this.sCustomer2 === null || this.sCustomer2 === undefined) ? '' : this.sCustomer2;
            reportParam.sRCCustomerBase1 = this.sRCCustomerBase1;
            reportParam.sRCCustomerBase2 = this.sRCCustomerBase2;
            reportParam.sType = 'S';
            reportParam.userPrint = this.activeUser.s_userName;

            this.isDisabledForProcess = true;

            this.mySub = this.reportingService.getReport(reportParam, 'topCustomer').subscribe((res) => {
                    let fileUrl = URL.createObjectURL(res);
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileUrl;
                    a.download = 'Top Customer Report';
                    a.click();
                    URL.revokeObjectURL(fileUrl);
                },
                (err) => {
                    this.httpUtilService.handleError(err);
                    this.errorMessage = this.appConfig.generalErrorMessage;
                    alertify.error(this.errorMessage);
                    this.isDisabledForProcess = false;
                    //this.logout();
                },
                () => {
                    this.isDisabledForProcess = false;
                });
        }
    }
}
