import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/quickKart-interfaces/product';
import { ICategory } from 'src/app/quickKart-interfaces/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[] = [];
  categories: ICategory[] = [];
  constructor(private http: HttpClient) {
    }

  getProducts(): Observable<IProduct[]> {

    let tempVar = this.http.get<IProduct[]>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/Product/GetProducts').pipe(catchError(this.errorHandler));;
    return tempVar;
  }

  getProductCategories(): Observable<ICategory[]> {

    let tempVar = this.http.get<ICategory[]>('https://infosysquickkartservices20211203141112.azurewebsites.net/api/Category/GetCategories').pipe(catchError(this.errorHandler));;
    return tempVar;
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

  getProducts1() {
    this.products = [
      { "productId": "P101", "productName": "Lamborghini Gallardo Spyder", "categoryId": 1, "price": 18000000, "quantityAvailable": 10 },
      { "productId": "P102", "productName": "Ben Sherman Mens Necktie Silk Tie", "categoryId": 2, "price": 1847, "quantityAvailable": 20 },
      { "productId": "P103", "productName": "BMW Z4", "categoryId": 1, "price": 6890000, "quantityAvailable": 10 },
      { "productId": "P104", "productName": "Samsung Galaxy S4", "categoryId": 3, "price": 38800, "quantityAvailable": 100 },
    ]

    return this.products;

  }

  getProductCategories1() {
    this.categories = [
      { "categoryId": 1, "categoryName": "Motors" },
      { "categoryId": 2, "categoryName": "Fashion" },
      { "categoryId": 3, "categoryName": "Electronics" },

    ]

    return this.categories;
  }
   

 
}
