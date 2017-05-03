import {Component, OnInit, AfterViewInit, Output, Input, EventEmitter} from "@angular/core";

declare let $:any;

@Component({
    selector: 'app-my-date-picker',
    templateUrl: './my-date-picker.component.html',
    styleUrls: ['./my-date-picker.component.css']
})
export class MyDatePickerComponent implements OnInit,AfterViewInit {
    @Output() dateVal = new EventEmitter();

    @Input()
    dateFormat:string;

    @Input()
    dateElemId:string;

    @Input()
    labelText:string;

    picker:any;

    constructor() {
    }

    ngOnInit() {
    }

    fireMyEvent(val) {
        this.dateVal.emit(val);
    }

    setAnotherDate(newDate:Date) {
        if (this.picker) {
            this.picker.pikaday('setDate', newDate);
        }
    }

    ngAfterViewInit() {
        let that = this;

        let datepicker1 = $('#' + this.dateElemId);
        this.picker = datepicker1.pikaday({
            firstDay: 1,
            minDate: new Date(2014, 0, 1),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2014, 2020],
            format: that.dateFormat,
            onSelect: function () {
                that.fireMyEvent(this.toString());
            }
        });
        this.picker.pikaday('setDate', new Date());
    }
}
