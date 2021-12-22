import { Component, OnInit } from '@angular/core';
import { IPurchaseDetail } from 'src/app/quickKart-interfaces/purchaseDetail';
import { PurchaseService } from 'src/app/quickKart-services/purchase-service/purchase.service';

@Component({
  selector: 'app-view-purchases',
  templateUrl: './view-purchases.component.html',
  styleUrls: ['./view-purchases.component.css']
})
export class ViewPurchasesComponent implements OnInit {

  purchaseDetails: IPurchaseDetail[] | null;
  filteredPurchases: IPurchaseDetail[] | null;
  showMsgDiv: boolean = false;
  errMsg!: string;
  userRole: string | null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  constructor(private _purchaseService: PurchaseService) {

    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }
  }

  ngOnInit(): void {

    //this.getPurchaseDetails("SamRocks@gmail.com");

    if (this.purchaseDetails == null) {
      this.showMsgDiv = true;
    }

    this.filteredPurchases = this.purchaseDetails;

  }

  getPurchaseDetails(emailId: string) {
    this._purchaseService.getPurchases(emailId).subscribe(
      responsePurchaseData =>
      {
        this.purchaseDetails = responsePurchaseData;
        //sorting algorithm for order by increasing purchase ID
        let compareID = function (item1: IPurchaseDetail, item2: IPurchaseDetail) {
          if (item1.purchaseId > item2.purchaseId) { return 1; }
          if (item1.purchaseId < item2.purchaseId) { return -1; }
          return 0;
        }
        //assigns sorted list to filteredPurchases
        this.filteredPurchases = this.purchaseDetails.sort(compareID);
        
        if (responsePurchaseData == null) {
          console.log("reponsePurchasedata == null");
        }

        if (this.filteredPurchases.length == 0) {
          this.showMsgDiv = true;
        } else {
          this.showMsgDiv = false;
        }

      },
      responsePurchaseError => {
        this.purchaseDetails = null;
        this.filteredPurchases = null;
        this.errMsg = responsePurchaseError;
        console.log(this.errMsg);
      },
      () => console.log("GetPurchases method executed successfully")
    );
  }

  searchPurchaseDetails(emailId: string) {

    this.filteredPurchases = this.purchaseDetails;

   

    if (emailId != null || emailId == "") {
      if (this.filteredPurchases != null) {
        if (this.filteredPurchases.length == 0) {
          this.showMsgDiv = true;
        } else {
          this.showMsgDiv = false;
        }
      }
    }

  }

}
