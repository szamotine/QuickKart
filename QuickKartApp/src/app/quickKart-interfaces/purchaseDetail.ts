import { DatePipe } from "@angular/common";

export interface IPurchaseDetail {

  purchaseId: number;
  emailId: string;
  productName: string;
  quantityPurchased: number;
  dateOfPurchase: Date;
  purchaseDate: DatePipe;

}
