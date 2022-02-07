import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ICartProduct } from 'src/app/quickKart-interfaces/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: ICartProduct[];
  baseURL = "http://localhost:11990/api/User/";

  constructor(private http: HttpClient) { }

  getCart(emailId: string): Observable <ICartProduct[]> {
    let params = new HttpParams().set("emailId", emailId);
    let tempURL = "GetCartProducts";
    //let tempVar = this.http.get<ICartProduct[]>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/User/GetCartProducts', { params })
    //  .pipe(catchError(this.errorHandler));;
    let tempVar = this.http.get<ICartProduct[]>(this.baseURL + tempURL, { params })
      .pipe(catchError(this.errorHandler));;

    return tempVar;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
