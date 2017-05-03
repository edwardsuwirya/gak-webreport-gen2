/**
 * Created by edo on 21/04/2017.
 */
import {Routes, RouterModule} from "@angular/router";
import {LoginPageComponent} from "../login-page/login-page.component";
import {PrivatePageComponent} from "../private-page/private-page.component";
import {PrivateMenuPageComponent} from "../private-menu-page/private-menu-page.component";
import {CustomerTransactionHistoryPageComponent} from "../customer-transaction-history-page/customer-transaction-history-page.component";
import {MemberPointsPageComponent} from "../member-points-page/member-points-page.component";
import {TopCustomerPageComponent} from "../top-customer-page/top-customer-page.component";
import {DeliveryOrderPageComponent} from "../delivery-order-page/delivery-order-page.component";
import {ReceiveOrderPageComponent} from "../receive-order-page/receive-order-page.component";
import {DailyLoadingPageComponent} from "../daily-loading-page/daily-loading-page.component";
import {StockPageComponent} from "../stock-page/stock-page.component";
import {ErrorTrapPageComponent} from "../error-trap-page/error-trap-page.component";
import {NgModule} from "@angular/core";


export const routes:Routes = [
    {path: '', component: LoginPageComponent},
    {
        path: 'home', component: PrivatePageComponent, children: [
        {path: '', component: PrivateMenuPageComponent},
        {path: 'report/custtranshist', component: CustomerTransactionHistoryPageComponent},
        {path: 'report/memberpts', component: MemberPointsPageComponent},
        {path: 'report/topcust', component: TopCustomerPageComponent},
        {path: 'report/deliord', component: DeliveryOrderPageComponent},
        {path: 'report/recvord', component: ReceiveOrderPageComponent},
        {path: 'report/dailyload', component: DailyLoadingPageComponent},
        {path: 'report/stock', component: StockPageComponent}
    ]
    },
    {path: 'login', component: LoginPageComponent},
    {path: '**', component: ErrorTrapPageComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRouteModule {
}
