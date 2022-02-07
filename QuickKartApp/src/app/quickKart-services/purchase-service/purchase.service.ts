import { Injectable } from '@angular/core';
import { IPurchaseDetail } from 'src/app/quickKart-interfaces/purchaseDetail';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  baseURL = "http://localhost:11990/api/purchase/";

  purchaseDetails: IPurchaseDetail[];
  constructor(private http: HttpClient) { }

  getPurchases(emailId: string): Observable<IPurchaseDetail[]> {
    let tempURL = "GetPurchaseDetailsByEmailId";
    let params = new HttpParams().set("emailId", emailId);
/*    let tempVar = this.http.get<IPurchaseDetail[]>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/purchase/GetPurchaseDetailsByEmailId', {params}).pipe(catchError(this.errorHandler));;*/
    let tempVar = this.http.get<IPurchaseDetail[]>(this.baseURL + tempURL, { params }).pipe(catchError(this.errorHandler));;
    return tempVar;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }


}
