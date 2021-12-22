import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/quickKart-interfaces/product';
import { ICategory } from 'src/app/quickKart-interfaces/category';
import { ProductService } from 'src/app/quickKart-services/product-service/product.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/quickKart-services/user-service/user.service';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: IProduct[] | null;
  categories: ICategory[]| null;
  filteredProducts: IProduct[] | null;
  searchByProductName!: string;
  searchByCategoryId: string = "0";
  imageSrc!: string;
  showMsgDiv: boolean = false;
  errMsg!: string;
  userRole: string | null;
  userName: string | null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;


  constructor(private _productService: ProductService, private _userService: UserService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName');
    this.imageSrc = 'assets/quickKart-images/add-item.jpg';
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }

  }

  ngOnInit()
  {
    this.getProducts();
    //Original Code:
    //this.products = this._productService.getProducts1();

    this.getProductCategories();
    //Original Code:
    //this.categories = this._productService.getProductCategories1();

    if (this.products == null) {
      this.showMsgDiv = true;
    }
    this.filteredProducts = this.products;
    

  }

  getProducts() {
    this._productService.getProducts().subscribe(
      responseProductData => {
      this.products = responseProductData;
        this.filteredProducts = responseProductData;
        this.showMsgDiv = false;
        if (responseProductData == null) {
          //this.products = this._productService.getProducts1();
          //this.filteredProducts = this.products;
          console.log("responseProductData ==null");
        } 
      },
      responseProductError => {
        //this.products = this._productService.getProducts1();
        this.products = null;
        this.errMsg = responseProductError;
        console.log(this.errMsg);
      },
      ()=> console.log("GetProducts method executed successfully")

    );
  }

  getProductCategories() {
    this._productService.getProductCategories().subscribe(
      responseCategoryData => {
        this.categories = responseCategoryData;
        if (responseCategoryData == null) {
          console.log("responseCategoryData == null");
          //this.categories = this._productService.getProductCategories1()
        }
      },
      responseCategoryError => {
        this.categories = this._productService.getProductCategories1();
        this.errMsg = responseCategoryError;
        console.log(this.errMsg);
      },
      () => console.log("GetProductCategories method executed successfully")
    );
    
  }

  searchProduct(productName: string) {
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    } else {
      if (this.products !=null) {
        this.filteredProducts = this.products.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
      }
      //this.filteredProducts = this.products.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }

    if (productName != null || productName == "") {
      this.searchByProductName = productName;
      if (this.filteredProducts != null) {
        this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
      }
      //this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
    }

    if (this.filteredProducts != null) {
      if (this.filteredProducts.length == 0) {
        this.showMsgDiv = true;
      } else {
        this.showMsgDiv = false;
      }
    }
    
  }

  searchProductByCategory(categoryId: string) {
/* //Original code:
    this.filteredProducts = this.products;

    if (categoryId == "0") {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == categoryId);
    }
*/
    //Updated code from LEX
    if ((this.searchByProductName != null || this.searchByProductName == "") && this.products !=null) {
 
      this.filteredProducts = this.products.filter(prod => prod.productName.toLowerCase().indexOf(this.searchByProductName.toLowerCase()) >= 0);
    } else {
      this.filteredProducts = this.products;
    }
    this.searchByCategoryId = categoryId;

    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    } else {
      if (this.filteredProducts != null) {
        this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
      }
      //this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }

  }

  searchProductByName(productName: string) {
    this.filteredProducts = this.products;

    if (productName == "") {
      this.filteredProducts = this.products;
    } else {
      if (this.filteredProducts !=null) {
        this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toString().includes(productName));
      }
     // this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toString().includes(productName) );

    }

    if (productName.startsWith("P")) {
      this.filteredProducts = this.products;
      if (this.filteredProducts != null) {
        this.filteredProducts = this.filteredProducts.filter(prod => prod.productId.toString().includes(productName));
      }
      //this.filteredProducts = this.filteredProducts.filter(prod => prod.productId.toString().includes(productName));

    }

  }

  addToCart(prod: IProduct) {
    if (this.userRole == null) {
      this.router.navigate(['/login']);
    } else {
      if (this.userName != null) {
        this._userService.addProductToCart(prod.productId, this.userName).subscribe(
          responseProductData => {
            if (responseProductData) {
              alert("Product Added successfully");
            }
          },
          responseProductError => {
            this.errMsg = responseProductError;
            console.log(this.errMsg);
            alert("Sorry, something went wrong adding product to cart. Please try again");
          },
          () => console.log("AddToCart method execute successfully")
        );
      }
    }
  }

}
