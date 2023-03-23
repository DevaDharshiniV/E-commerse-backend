import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router) { }

  uploadImage(selectedImage: any,productData: any, formStatus: string,id: any){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath,selectedImage).then(()=>{
      console.log('Product Image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
        productData.productImgPath = URL;
        console.log(productData);

        if(formStatus=='Edit'){
          this.updateData(id,productData);
        }else{
          this.saveData(productData);
        }


      })
    })
  }

  saveData(productData: any){
    this.afs.collection('products').add(productData).then(docRef => {
      this.toastr.success('Data Inserted successfully');
      this.router.navigate(['/product-details'])
    })
  }
  loadData() {
    return this.afs.collection('products').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, data };
        }) as Array<{id: string, data: Product}>;
      })
    );
  }







  loadOnedata(id: any){
    return this.afs.doc(`products/${id}`).valueChanges();
  }

  updateData(id: any, productData: any){
    this.afs.doc(`products/${id}`).update(productData).then(() => {
      this.toastr.success('Data Updated Successfully');
      this.router.navigate(['product-details']);
    })
  }

  deleteImage(productImgPath: any,id: any){
    this.storage.storage.refFromURL(productImgPath).delete().then(() =>{
      this.deleteData(id);

    })
  }

  deleteData(id:any){
    this.afs.doc(`products/${id}`).delete().then(() => {
      this.toastr.warning('Data Deleted ..!');

    })
  }

  markFeatured(id:any, featuredData: any){
    this.afs.doc(`products/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured status updated');
    })
  }

  // getProductByName(name: string): Observable<Product | undefined> {
  //   return this.afs.collection('products', ref => ref.where('name', '==', name)).snapshotChanges().pipe(
  //     map(actions => {
  //       const products = actions.map(a => {
  //         const data = a.payload.doc.data() as Product;
  //         const id = a.payload.doc.id;
  //         return { ...data, id };
  //       });
  //       return products.length ? products[0] : undefined;
  //     })
  //   );
  // }







}
