import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from "@angular/core";
import {CustomerService} from "../../service/customer.service";
import {ResponsibilityCenter} from "../../model/responsibility-center";
import {ResponsibilityCenterService} from "../../service/responsibility-center.service";
import {Customer} from "../../model/customer";
import {AuthenticationService} from "../../../shared/service/authentication.service";
import {HttpUtilService} from "../../../shared/service/http-util.service";

declare let $:any;
declare let alertify:any;

@Component({
    selector: 'app-my-member-picker',
    templateUrl: './my-member-picker.component.html',
    styleUrls: ['./my-member-picker.component.css']
})
export class MyMemberPickerComponent implements OnInit,AfterViewInit {
    @Input()
    memberPickerId:string;

    @Output()
    memberSelection = new EventEmitter<Customer>();

    members:Customer[];
    responsibilityCenters:ResponsibilityCenter[];

    memberCode:string;
    memberName:string;
    memberResponsibilityCode:string;
    memberTypeCode:string;

    constructor(private memberService:CustomerService, private responsibilityCenterService:ResponsibilityCenterService, private authService:AuthenticationService, private httpUtilService:HttpUtilService) {
    }

    ngOnInit() {
        this.responsibilityCenterService.getAllResponsibility()
            .subscribe(cr => {
                let resp = cr.responseDescription;
                this.responsibilityCenters = JSON.parse(resp);
            }, err => {
                console.log(err);
                this.httpUtilService.handleError(err);
            });
    }

    ngAfterViewInit() {
        $('.modal').leanModal();
        $('select').select2();
    }

    onMemberSelection(member:Customer) {
        this.memberSelection.emit(member);
        $('.modal').closeModal();
    }

    onRefreshData() {
        let memberCode:string;
        let memberName:string;
        let memberResponsibilityCode:string;
        let memberTypeCode:string;

        if (!this.memberCode) {
            memberCode = '%%';
        } else {
            memberCode = this.memberCode;
        }
        if (!this.memberName) {
            memberName = '%%';
        } else {
            memberName = this.memberName;
        }
        this.memberResponsibilityCode = $('#member_respcode').val();
        if (!this.memberResponsibilityCode) {
            memberResponsibilityCode = '%%';
        } else {
            memberResponsibilityCode = this.memberResponsibilityCode;
        }
        if (!this.memberTypeCode) {
            memberTypeCode = '%%';
        } else {
            memberTypeCode = this.memberTypeCode;
        }


        this.memberService.getMember('GAK', encodeURI(memberCode), encodeURI(memberName), encodeURI(memberResponsibilityCode), encodeURI(memberTypeCode)
        ).subscribe(cr => {
            let resp = cr.responseDescription;
            this.members = JSON.parse(resp);
        }, err => {
            this.httpUtilService.handleError(err);
            alertify.error('Failed to get data picker');
        });

    }

}
