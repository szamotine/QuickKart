import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewPurchasesComponent } from './view-purchases/view-purchases.component';
import { AuthGuardService } from './quickKart-services/auth-service/auth-guard.service';
import { RegisterComponent } from 'src/app/register/register.component';
import { UpdateCartComponent } from 'src/app/update-cart/update-cart.component';
import { PipeComponent } from 'src/app/pipe/pipe.component';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewProducts', component: ViewProductsComponent },
  { path: 'viewCart', component: ViewCartComponent, canActivate: [AuthGuardService] },
  { path: 'viewPurchases', component: ViewPurchasesComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'pipe', component: PipeComponent },
  { path: 'updateCart/:productId/:productName/:quantity/:quantityAvailable', component: UpdateCartComponent },
  {path: '**', component: HomeComponent}
];

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
