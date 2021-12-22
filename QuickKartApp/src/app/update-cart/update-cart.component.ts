import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/quickKart-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.css']
})
export class UpdateCartComponent implements OnInit {

  productId: string;
  productName: string;
  quantity: number;
  quantityAvailable: number;
  emailId: string | null;
  status: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
    this.emailId = sessionStorage.getItem("userName");
    if (this.emailId == null) {
      this.router.navigate(['/viewCart']);
    }
    this.productId = this.route.snapshot.params['productId'];
    this.productName = this.route.snapshot.params['productName'];
    this.quantity = parseInt(this.route.snapshot.params['quantity']);
    this.quantityAvailable = parseInt(this.route.snapshot.params['quantityAvailable']);

  }

  updateCart(quantity: number) {
    if (this.emailId != null) {
      this._userService.UpdateCartProduct(this.emailId, this.productId, quantity).subscribe(
        responseUpdateCartStatus => {
          this.status = responseUpdateCartStatus;
          if (this.status) {
            alert("Product quantity updated successfully");
            this.router.navigate(['/viewCart']);
          } else {
            alert("Error: could not update product quantity");
            this.router.navigate(['/viewCart']);
          }
        },
        responseUpdateCartError => {
          this.errorMsg = responseUpdateCartError;
          console.log(this.errorMsg);
          alert("Error: responseUpdateCartError");
          this.router.navigate(['/viewCart']);
        },
        () => console.log("UpdateCart method executed successfully")
      );
    }
  }

}
