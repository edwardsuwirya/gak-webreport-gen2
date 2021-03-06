import {Component, OnInit, AfterViewInit, ViewChild, Inject} from "@angular/core";
import {AuthenticationService} from "../shared/service/authentication.service";
import {ReportingService} from "../shared/service/reporting.service";
import {Subscription} from "rxjs";
import {ReportParam} from "../shared/model/report-param";
import {MyDatePickerComponent} from "../shared/component/my-date-picker/my-date-picker.component";
import {ResponsibilityCenter} from "../shared/model/responsibility-center";
import {Article} from "../shared/model/article";
import {HttpUtilService} from "../shared/service/http-util.service";
import {APP_CONFIG} from "../shared/model/application-properties";
import {User} from "../shared/model/user";

declare let $: any;
declare let alertify: any;

@Component({
    selector: 'app-daily-loading-page',
    templateUrl: './daily-loading-page.component.html',
    providers: [ReportingService],
    styleUrls: ['./daily-loading-page.component.css']
})
export class DailyLoadingPageComponent implements OnInit {
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

    mySub: Subscription;

    errorMessage: string = 'An error occured';

    rcName1: string;
    rcName2: string;
    articleName1: string;
    articleName2: string;

    @ViewChild('date2')
    private datePicker2: MyDatePickerComponent;

    activeUser: User;

    isDisabledForProcess: boolean = false;

    constructor(private authService: AuthenticationService,
                private reportingService: ReportingService,
                private httpUtilService: HttpUtilService,
                @Inject(APP_CONFIG) private appConfig) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
        this.activeUser = this.authService.activeUser;
    }

    doClearForm() {
        this.doClearResponsibility();
        this.doClearArticle();
        return false;
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

    logout() {
        this.authService.logout();
    }

    cancelReport() {
        if (this.mySub) {
            this.mySub.unsubscribe();
            this.isDisabledForProcess = false;
        }
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
            reportParam.userPrint = this.activeUser.s_userName;

            this.isDisabledForProcess = true;

            this.mySub = this.reportingService.getReport(reportParam, 'dailyLoading').subscribe((res) => {
                    let fileUrl = URL.createObjectURL(res);
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileUrl;
                    a.download = 'Daily Loading Report';
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
