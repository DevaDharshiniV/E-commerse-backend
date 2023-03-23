import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from './auth.guard';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: 'product-details', component: ProductDetailsComponent,canActivate: [AuthGuard]},
  {path: 'user-details', component: UserDetailsComponent,canActivate: [AuthGuard]},
  {path: 'single-product', component: SingleProductComponent,canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent,canActivate: [AuthGuard]},
  {path: 'orders', component: OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
