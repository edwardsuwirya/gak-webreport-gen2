import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from "@angular/core";
import {ResponsibilityCenter} from "../../model/responsibility-center";
import {ResponsibilityCenterService} from "../../service/responsibility-center.service";
import {AuthenticationService} from "../../../shared/service/authentication.service";
import {HttpUtilService} from "../../../shared/service/http-util.service";

declare let $:any;
declare let alertify:any;

@Component({
    selector: 'app-my-responsibility-center-picker',
    providers: [ResponsibilityCenterService],
    templateUrl: './my-responsibility-center-picker.component.html',
    styleUrls: ['./my-responsibility-center-picker.component.css']
})
export class MyResponsibilityCenterPickerComponent implements OnInit, AfterViewInit {
    @Input()
    rcPickerId:string;
    @Output()
    rcSelection = new EventEmitter<ResponsibilityCenter>();

    responsibilityCenters:ResponsibilityCenter[];

    rcRealCode:string;
    rcName:string;

    constructor(private responsibilityCenterService:ResponsibilityCenterService, private authService:AuthenticationService, private httpUtilService:HttpUtilService) {
    }

    ngOnInit() {
    }

    onRefreshData() {
        let respCtrRealCode:string;
        let respCtrName:string;
        if (!this.rcRealCode) {
            respCtrRealCode = '%%';
        } else {
            respCtrRealCode = this.rcRealCode;
        }
        if (!this.rcName) {
            respCtrName = '%%';
        } else {
            respCtrName = this.rcName;
        }

        this.responsibilityCenterService.getResponsibility(encodeURI(respCtrRealCode), encodeURI(respCtrName))
            .subscribe(cr => {
                let resp = cr.responseDescription;
                this.responsibilityCenters = JSON.parse(resp);
            }, err=> {
                this.httpUtilService.handleError(err);
                alertify.error('Failed to get data picker');
            });
    }

    ngAfterViewInit() {
        $('.modal').leanModal();
    }

    onRCSelection(responsibilityCenter:ResponsibilityCenter) {
        this.rcSelection.emit(responsibilityCenter);
        $('.modal').closeModal();
    }

}
