import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order,OrderWithStatus } from '../models/order';
import { from } from 'rxjs';
// export interface OrderWithStatus extends Order {
//   status: string;
// }


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore) { }

  getOrders() {
    return this.afs.collection<Order>('orders').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  saveOrder(order: Order) {
    return this.afs.collection('orders').add(order);
  }

  updateOrderStatus(order: OrderWithStatus): Promise<void> {
    return this.afs.doc(`orders/${order.id}`).update({ status: order.status });
  }

  cancelOrder(order: Order): Observable<void> {
    const orderWithStatus: OrderWithStatus = {
      ...order,
      status: 'Cancelled'
    };
    return from(this.updateOrderStatus(orderWithStatus));
  }

  refundOrder(order: Order): Observable<void> {
    const orderWithStatus: OrderWithStatus = {
      ...order,
      status: 'Refunded'
    };
    return from(this.updateOrderStatus(orderWithStatus));
  }


}
