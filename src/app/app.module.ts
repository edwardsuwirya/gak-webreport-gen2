import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {CustomerTransactionHistoryPageComponent} from './customer-transaction-history-page/customer-transaction-history-page.component';
import {DailyLoadingPageComponent} from './daily-loading-page/daily-loading-page.component';
import {DeliveryOrderPageComponent} from './delivery-order-page/delivery-order-page.component';
import {ErrorTrapPageComponent} from './error-trap-page/error-trap-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {MemberPointsPageComponent} from './member-points-page/member-points-page.component';
import {PrivatePageComponent} from './private-page/private-page.component';
import {PrivateMenuPageComponent} from './private-menu-page/private-menu-page.component';
import {ReceiveOrderPageComponent} from './receive-order-page/receive-order-page.component';
import {TopCustomerPageComponent} from './top-customer-page/top-customer-page.component';
import {StockPageComponent} from './stock-page/stock-page.component';
import {MyDatePickerComponent} from './shared/component/my-date-picker/my-date-picker.component';
import {MyDateFormatPipe} from './shared/pipe/my-date-format.pipe';
import {MyNumberFormatPipe} from './shared/pipe/my-number-format.pipe';
import {MyResponsibilityCenterPickerComponent} from './shared/component/my-responsibility-center-picker/my-responsibility-center-picker.component';
import {MyArticlePickerComponent} from './shared/component/my-article-picker/my-article-picker.component';
import {MyCustomerPickerComponent} from './shared/component/my-customer-picker/my-customer-picker.component';
import {MyMemberPickerComponent} from './shared/component/my-member-picker/my-member-picker.component';
import {MyClearInputComponent} from './shared/component/my-clear-input/my-clear-input.component';
import {appConfig, APP_CONFIG} from './shared/model/application-properties';
import {AppRouteModule} from './app-route/app-route.module';

@NgModule({
    declarations: [
        AppComponent,
        CustomerTransactionHistoryPageComponent,
        DailyLoadingPageComponent,
        DeliveryOrderPageComponent,
        ErrorTrapPageComponent,
        LoginPageComponent,
        MemberPointsPageComponent,
        PrivatePageComponent,
        PrivateMenuPageComponent,
        ReceiveOrderPageComponent,
        TopCustomerPageComponent,
        StockPageComponent,
        MyDatePickerComponent,
        MyDateFormatPipe,
        MyNumberFormatPipe,
        MyResponsibilityCenterPickerComponent,
        MyArticlePickerComponent,
        MyCustomerPickerComponent,
        MyMemberPickerComponent,
        MyClearInputComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRouteModule
    ],
    providers: [
        {provide: APP_CONFIG, useValue: appConfig}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
