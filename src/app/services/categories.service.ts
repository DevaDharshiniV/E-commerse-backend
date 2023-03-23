import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore,fromDocRef } from '@angular/fire/compat/firestore';
import { map} from 'rxjs/operators';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: any) {
    this.afs.collection('categories').add(data)
      .then(() => {
        console.log('Data Inserted Successfully');
        this.toastr.success('Data Inserted Successfully');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Error inserting data');
      });
  }





  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
  updateData(id: any, EditData: any) {
    if (!id) {
      console.error('Document ID is undefined');
      this.toastr.error('Error updating data: Document ID is undefined');
      return;
    }
    this.afs.doc(`categories/${id}`).update(EditData)
      .then(docRef => {
        console.log('Data Updated Successfully..');
        this.toastr.success('Data Updated Successfully');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Error updating data');
      });
  }
  deleteData(id: any){
    this.afs.collection('categories').doc(id).delete().then((docRef) =>{
      this.toastr.success('Data Deleted ..!');
    })
  }
}
