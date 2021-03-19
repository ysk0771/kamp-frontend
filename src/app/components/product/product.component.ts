import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { ProdcutService } from 'src/app/services/prodcut.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded=false;

  productResponseModel: ProductResponseModel = {
    data: this.products,
    message: '',
    success: true,
  };

  constructor(private prodcutService:ProdcutService) {}

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts() {
    this.prodcutService.getProducts().subscribe(response=>{
      this.products=response.data
      this.dataLoaded=true;//senkronisayon ayarladık
    })
    
  }
}
