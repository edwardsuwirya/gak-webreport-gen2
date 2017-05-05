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
    selector: 'app-stock-page',
    providers: [ReportingService, CustomerService, ResponsibilityCenterService],
    templateUrl: './stock-page.component.html',
    styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {
    ddformat: string = 'DD MMM YYYY';
    labelDateText: string = 'Date';
    dateId1: string = 'date1';
    dateIdEnd: string = 'dateEnd';
    sDate1: string;
    sDateEnd: string;
    sRC1: string;
    sRC2: string;
    sArticle1: string;
    sArticle2: string;
    sCustomer1: string;
    sCustomer2: string;
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

    @ViewChild('dateEnd')
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
            this.sDateEnd = val;
            this.datePicker2.setAnotherDate(new Date(val));
        } else {
            this.sDateEnd = val;
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
        if (this.sDate1 === null || this.sDateEnd === null || this.sDateEnd === undefined
            || this.sRC1 === null || this.sRC1 === undefined || this.sRC2 === null || this.sRC2 === undefined) {
            this.errorMessage = this.appConfig.mandatoryErrorMessage;
            alertify.error(this.errorMessage);
        } else {
            let reportParam = new ReportParam();
            reportParam.sCompanyCode = this.appConfig.companyCode;
            //reportParam.sDate1 = this.sDate1;
            reportParam.sDateEnd = this.sDateEnd;
            reportParam.sRC1 = this.sRC1;
            reportParam.sRC2 = this.sRC2;
            reportParam.sArticle1 = (this.sArticle1 === null || this.sArticle1 === undefined) ? '' : this.sArticle1;
            reportParam.sArticle2 = (this.sArticle2 === null || this.sArticle2 === undefined) ? '' : this.sArticle2;
            reportParam.sCustomer1 = (this.sCustomer1 === null || this.sCustomer1 === undefined) ? '' : this.sCustomer1;
            reportParam.sCustomer2 = (this.sCustomer2 === null || this.sCustomer2 === undefined) ? '' : this.sCustomer2;
            reportParam.sType = 'S';
            reportParam.userPrint = this.activeUser.s_userName;

            this.isDisabledForProcess = true;

            this.mySub = this.reportingService.getReport(reportParam, 'stockByRO').subscribe((res) => {
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
        }
    }
}
