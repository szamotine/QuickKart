import { Component, OnInit } from '@angular/core';
import { ICartProduct } from 'src/app/quickKart-interfaces/cartProduct';
import { CartService } from 'src/app/quickKart-services/cart-service/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/quickKart-services/user-service/user.service';


@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  cartProducts: ICartProduct[] | null;
  filteredCartProducts: ICartProduct[] | null;
  showMsgDiv: boolean = false;
  errMsg!: string;
  userRole: string | null;
  userName: string | null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  imageSrc: string;
  Products: ICartProduct[];
  deleteStatus: boolean = false;
  emailId: string;

  constructor(private _cartService: CartService, private _userService: UserService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName');
    if (this.userName != null) {
      this.emailId = this.userName;
    }
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }
    this.imageSrc = 'assets/quickKart-images/delete-item.jpg';
  }

  ngOnInit(): void {
    if (this.cartProducts == null) {
      this.showMsgDiv = true;
    }

    //this.filteredCartProducts = this.cartProducts;
    this.getCartDetails();
    
  }

  removeProductFromCart(product: ICartProduct) {
    this._userService.deleteCartProduct(product.productId, this.emailId).subscribe(
      responseRemoveCartProductStatus => {
        this.deleteStatus = responseRemoveCartProductStatus;
        if (this.deleteStatus) {
          alert("Product removed successfully");
          this.ngOnInit();
        } else {
          alert("Error: product could not be removed");
        }
      },
      responseRemoveCartProductError => {
        this.errMsg = responseRemoveCartProductError;
        alert("Error: responseRemoveCartProductError");
      },
      () => console.log("RemoveProductFromCart executed successfully")
    );
  }

  updateCart(prod: ICartProduct) {
    this.router.navigate(['/updateCart', prod.productId, prod.productName, prod.quantity, prod.quantityAvailable]);
  }

  getCartDetails() {
    if (this.userName != null) {
      this._cartService.getCart(this.userName).subscribe(
        responseCartData => {
          this.cartProducts = responseCartData;
          this.filteredCartProducts = responseCartData;
          if (responseCartData == null) {
            console.log("reponseCartData == null");
          }
          if (this.filteredCartProducts.length == 0) {
            this.showMsgDiv = true;
            this.errMsg = "No Records found in getCartDetails()";
          } else {
            this.showMsgDiv = false;
          }
        },
        responseCartError => {
          this.cartProducts = this.filteredCartProducts = null;
          this.errMsg = responseCartError;
          console.log(this.errMsg);
        },
        () => console.log("GetCart method executed successfully")
      );
    }
    //this.updateTotalAmount();
  }

  updateTotalAmount() {
    /*
    if (this.filteredCartProducts != null) {
      console.log("filteredCartProducts !=null");
      for (var item of this.filteredCartProducts) {
        item.totalAmount = item.price * item.quantity;
        console.log(item.productName);
        console.log(item.totalAmount);
      }
    } else {
      console.log("filteredCartProducts == null");
    }
    */

    if (this.cartProducts != null) {
      //console.log("cartProducts !=null");
      for (var item of this.cartProducts) {
        item.totalAmount = item.price * item.quantity;
      }
    } else {
      console.log("cartProducts == null");
    }
  }

}
