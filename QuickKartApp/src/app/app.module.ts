import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { ViewPurchasesComponent } from './view-purchases/view-purchases.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { HomeComponent } from 'src/home/home.component';
import { routing } from 'src/app/app.routing';
import { CustomerLayoutComponent } from 'src/app/layouts/customer-layout/customer-layout.component';
import { UpdateCartComponent } from './update-cart/update-cart.component';
import { PipeComponent } from './pipe/pipe.component';
import { ContractNamePipe} from './custom-pipes/contract-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    CommonLayoutComponent,
    ViewPurchasesComponent,
    ViewCartComponent,
    HomeComponent,
    CustomerLayoutComponent,
    UpdateCartComponent,
    PipeComponent,
    ContractNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
