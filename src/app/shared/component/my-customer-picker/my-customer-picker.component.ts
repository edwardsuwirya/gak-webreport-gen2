import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from "@angular/core";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer.service";
import {ResponsibilityCenterService} from "../../service/responsibility-center.service";
import {ResponsibilityCenter} from "../../model/responsibility-center";
import {AuthenticationService} from "../../../shared/service/authentication.service";
import {HttpUtilService} from "../../../shared/service/http-util.service";

declare let $:any;
declare let alertify:any;

@Component({
    selector: 'app-my-customer-picker',
    templateUrl: './my-customer-picker.component.html',
    styleUrls: ['./my-customer-picker.component.css']
})
export class MyCustomerPickerComponent implements OnInit,AfterViewInit {
    @Input()
    customerPickerId:string;

    @Output()
    customerSelection = new EventEmitter<Customer>();

    customers:Customer[];
    responsibilityCenters:ResponsibilityCenter[];

    customerCode:string;
    customerName:string;
    customerResponsibilityCode:string;

    constructor(private customerService:CustomerService, private responsibilityCenterService:ResponsibilityCenterService, private authService:AuthenticationService, private httpUtilService:HttpUtilService) {
    }

    ngOnInit() {
        this.responsibilityCenterService.getAllResponsibility()
            .subscribe(cr => {
                let resp = cr.responseDescription;
                this.responsibilityCenters = JSON.parse(resp);
            }, err => {
                console.log("err:" + err);
                this.httpUtilService.handleError(err);
            });
    }

    ngAfterViewInit() {
        $('.modal').leanModal();
        $('select').select2();
    }

    onCustomerSelection(customer:Customer) {
        this.customerSelection.emit(customer);
        $('.modal').closeModal();
    }

    onRefreshData() {
        let customerCode:string;
        let customerName:string;
        let customerResponsibilityCode:string;
        if (!this.customerCode && !this.customerName) {
            alertify.error('Please fill code or name');
        } else {
            if (!this.customerCode) {
                customerCode = '%%';
            } else {
                customerCode = this.customerCode;
            }
            if (!this.customerName) {
                customerName = '%%';
            } else {
                customerName = this.customerName;
            }
            this.customerResponsibilityCode = $('#customer_respcode').val();
            if (!this.customerResponsibilityCode) {
                customerResponsibilityCode = '%%';
            } else {
                customerResponsibilityCode = this.customerResponsibilityCode;
            }


            this.customerService.getCustomer('GAK', encodeURI(customerCode), encodeURI(customerName), encodeURI(customerResponsibilityCode))
                .subscribe(cr => {
                    let resp = cr.responseDescription;
                    this.customers = JSON.parse(resp);
                }, err => {
                    this.httpUtilService.handleError(err);
                    alertify.error('Failed to get data picker');
                });
        }

    }

}
