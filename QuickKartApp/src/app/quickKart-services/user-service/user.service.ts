import { Injectable } from '@angular/core';
import { IUser } from 'src/app/quickKart-interfaces/user';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ICart } from 'src/app/quickKart-interfaces/cart';
import { ICartProduct } from '../../quickKart-interfaces/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = "http://localhost:11990/api/User/";
  constructor(private http: HttpClient) { }

  validateCredentials(id: string, password: string): Observable <string> {
    let userObj: IUser;
    let tempURL = "ValidateUserCredentials"
    userObj = {emailId: id, userPassword:password, gender: null, roleId: null, dateOfBirth: null, address:null };

    //return this.http.post<string>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/user/ValidateUserCredentials', userObj)
    //  .pipe(catchError(this.errorHandler));

    return this.http.post<string>(this.baseURL + tempURL, userObj)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

  addProductToCart(productId: string, emailId: string): Observable<boolean> {

    let cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 1 };

    let tempURL = "addProductToCart";

    //return this.http.post<boolean>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/user/addProductToCart', cartObj )
    //  .pipe(catchError(this.errorHandler));
    return this.http.post<boolean>(this.baseURL + tempURL, cartObj)
      .pipe(catchError(this.errorHandler));
  }

  RegisterUser(userObj: IUser): Observable<boolean> {

    let tempURL = "InsertUserDetails"
   //return this.http.post<boolean>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/user/InsertUserDetails', userObj )
   //   .pipe(catchError(this.errorHandler));
    return this.http.post<boolean>(this.baseURL + tempURL, userObj)
      .pipe(catchError(this.errorHandler));
  }

  getCartProducts(emailId: string): Observable<ICartProduct[]> {
    let tempURL = "GetCartProducts"
    let param = "?emailId=" + emailId;
    //return this.http.get<ICartProduct[]>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/user/GetCartProducts' + param)
    //  .pipe(catchError(this.errorHandler));
    return this.http.get<ICartProduct[]>(this.baseURL + tempURL + param)
      .pipe(catchError(this.errorHandler));
  }

  UpdateCartProduct(emailId: string, productId:string, quantity:number): Observable<boolean> {
    let cartObj: ICart;
    cartObj = {
      productId: productId,
      emailId: emailId,
      quantity: quantity
    };
    let tempURL = "UpdateCartProducts";
    //return this.http.put<boolean>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/user/UpdateCartProducts', cartObj)
    //  .pipe(catchError(this.errorHandler));
    return this.http.put<boolean>(this.baseURL + tempURL, cartObj)
      .pipe(catchError(this.errorHandler));
  }

  deleteCartProduct(productId: string, emailId: string): Observable<boolean> {
    let tempURL = "DeleteCartProduct";
    let cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 0 };
    let httpOptions = { headers: new HttpHeaders({'ContentType': 'application/json'}), body: cartObj };

    /*    return this.http.delete<boolean>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/user/DeleteCartProduct', httpOptions).pipe(catchError(this.errorHandler));*/
    return this.http.delete<boolean>(this.baseURL + tempURL, httpOptions).pipe(catchError(this.errorHandler));
  }

}
