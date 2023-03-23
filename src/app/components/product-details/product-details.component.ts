import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productArray: { id: string, data: Product }[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.loadData().subscribe(val => {
      console.log(val);
      this.productArray = val.map(product => {
        return {
          id: product.id,
          data: {
            ...product.data,
            category: product.data.category
              ? {
                  categoryId: product.data.category.categoryId,
                  category: product.data.category.category
                }
              : { categoryId: '', category: '' }
          }
        };
      });
      console.log(this.productArray);
    });
  }



  onDelete(productImgPath: any, id:any){
    this.productService.deleteImage(productImgPath,id);
  }

  onFeatured(id:any,value: any){
    const featuredData ={
      isFeatured: value

    }
    this.productService.markFeatured(id,featuredData);
    console.log("Iam feautureed");
  }


}




