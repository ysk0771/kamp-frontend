import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActionSequence } from 'selenium-webdriver';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProdcutService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText="";

  // productResponseModel: ProductResponseModel = {
  //   data: this.products,
  //   message: '',
  //   success: true,
  // };

  constructor(
    private productService: ProdcutService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"])
      } else {
        this.getProducts()
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true; //senkronisayon ayarladık
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true; //senkronisayon ayarladık
      });
  }

  addToCart(product:Product){
    this.toastrService.success("Sepete eklendi",product.productName);
    this.cartService.addToCart(product);
  }
}
