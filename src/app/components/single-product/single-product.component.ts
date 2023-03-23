import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  selectedImg: any;
  categories: Category[] = [];
  productForm!: FormGroup;
  formStatus: string = 'New';
  docId!: string;
  // productDetails: string[] = [];
  imgSrc: any = './assets/placeholder-image.jpg';
  product: any;
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(val => {
      this.docId = val['id'];
      // console.log(val);
      if (this.docId) {
        this.productService.loadOnedata(val['id']).subscribe(product => {
          // this.productDetails = [];

          this.product = product;

          this.productForm = this.fb.group({
            name: [this.product.name, [Validators.required, Validators.minLength(10)]],
            category: [`${this.product.category.categoryId}-${this.product.category.category}`,Validators.required],
            description: [this.product.description, [Validators.required, Validators.minLength(20)]],
            // details: [[], [this.detailsArrayValidator()]],
            price: [this.product.price, [Validators.required, Validators.min(0)]],
            image: ['']
          });
          this.imgSrc = this.product.productImgPath;
          this.formStatus = 'Edit';
        })

      }else {
        this.productForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(10)]],
          category: ['',Validators.required],
          description: ['', [Validators.required, Validators.minLength(20)]],
          // details: [[], [this.detailsArrayValidator()]],
          price: ['', [Validators.required, Validators.min(0)]],
          image: ['']
        });

      }

    })




  }
  // detailsArrayValidator() {
  //   return (control: AbstractControl): {[key: string]: any} | null => {
  //     const details = control.value;
  //     if (details.length < 1) {
  //       return {'invalidDetailsArray': {value: details}};
  //     }
  //     return null;
  //   };
  // }

  ngOnInit(): void{
    this.categoryService.loadData().subscribe((val : any [])=> {
      this.categories = val.map(c => ({
        id: c.id,
        category: c.data.category
      }));
    })

  }
  get fc() {
    return this.productForm.controls;
  }

  onSubmit() {
    console.log(this.categories);
    console.log(this.productForm.value);
    let splitted = this.productForm.value.category.split('-');
    console.log(splitted)
    const productData: Product = {
      name: this.productForm.value.name,
      category:{
        categoryId: splitted[0],
        category: splitted[1]
      },
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      productImgPath: '',
      isFeatured: false,

    }

    this.productService.uploadImage(this.selectedImg, productData, this.formStatus, this.docId);
    this.productForm.reset();
    this.imgSrc = './assets/placeholder-image.jpg';
  }








  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];

  }

}
