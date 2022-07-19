import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {"path":"",redirectTo:"dashboard",pathMatch:"full"},
  {"path":"login",component:LoginComponent},
  {"path":"productList",component:ProductsComponent},
  {"path":"dashboard",component:AdminDashboardComponent},
  {"path":"payment",component:PaymentComponent},
  {"path":"aboutUs",component:AboutUsComponent},
  {"path":"changePassword",component:ChangePasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
