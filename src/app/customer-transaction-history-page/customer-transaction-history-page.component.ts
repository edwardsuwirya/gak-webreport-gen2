import {Component, OnInit, ViewChild, Inject} from "@angular/core";
import {AuthenticationService} from "../shared/service/authentication.service";
import {AppTokenService} from "../shared/service/app-token.service";
import {ReportingService} from "../shared/service/reporting.service";
import {Subscription} from "rxjs";
import {CustomerTransactionHistory} from "../shared/model/customer-transaction-history";
import {ReportParam} from "../shared/model/report-param";
import {ResponsibilityCenter} from "../shared/model/responsibility-center";
import {Article} from "../shared/model/article";
import {Customer} from "../shared/model/customer";
import {MyDatePickerComponent} from "../shared/component/my-date-picker/my-date-picker.component";
import {CustomerService} from "../shared/service/customer.service";
import {ResponsibilityCenterService} from "../shared/service/responsibility-center.service";
import {HttpUtilService} from "../shared/service/http-util.service";
import {APP_CONFIG} from "../shared/model/application-properties";
import {User} from "../shared/model/user";

declare let $: any;
declare let alertify: any;

@Component({
    selector: 'app-customer-transaction-history-page',
    providers: [AuthenticationService, AppTokenService, ReportingService, CustomerService, ResponsibilityCenterService],
    templateUrl: './customer-transaction-history-page.component.html',
    styleUrls: ['./customer-transaction-history-page.component.css']
})
export class CustomerTransactionHistoryPageComponent implements OnInit {
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
    sType: string;
    isDisabledForProcess: boolean = false;

    @ViewChild('date2')
    private datePicker2: MyDatePickerComponent;

    errorMessage: string = 'An error occured';

    resp: CustomerTransactionHistory[];

    mySub: Subscription;

    rcName1: string;
    rcName2: string;
    articleName1: string;
    articleName2: string;
    customerName1: string;
    customerName2: string;

    activeUser: User;

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

    dateValChange(id: string, val) {
        if (id === '1') {
            this.sDate1 = val;
            this.sDate2 = val;
            this.datePicker2.setAnotherDate(new Date(val));
        } else {
            this.sDate2 = val;
        }
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


    createReport(reportType: number) {
        if (this.sDate1 === null || this.sDate1 === undefined || this.sDate2 === null || this.sDate2 === undefined
            || this.sRC1 === null || this.sRC1 === undefined || this.sRC2 === null || this.sRC2 === undefined) {
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
            reportParam.sType = 'A';
            reportParam.userPrint = this.activeUser.s_userName;

            this.isDisabledForProcess = true;

            if (reportType === 0) {
                this.mySub = this.reportingService.getReport(reportParam, 'customerTransactionHistory').subscribe((res) => {
                        let fileUrl = URL.createObjectURL(res);
                        window.open(fileUrl, '_blank');
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
            } else {
                this.mySub = this.reportingService.getTableReport(reportParam, 'customerTransactionHistory').subscribe(resp => {
                        this.resp = <CustomerTransactionHistory[]>resp;
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
}
