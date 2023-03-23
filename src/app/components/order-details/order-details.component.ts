import { Component, OnInit } from '@angular/core';
import { OrderService} from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';
import { OrderWithStatus } from 'src/app/models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers:[DatePipe]
})
export class OrderDetailsComponent implements OnInit {



  orders: Order[] = [];
  selectedOrder: Order | null = null;
  orderStatuses: string[] = [ 'Shipped', 'Cancelled', 'Refunded'];
  // selectedStatus!: string;
  selectedStatus: string = this.orderStatuses[0];

  constructor(private orderService: OrderService,public datePipe: DatePipe) {

   }

  ngOnInit(): void {
    this.getOrders();

  }

  // getOrders(): void {
  //   this.orderService.getOrders().subscribe(orders => {
  //     this.orders = orders;
  //   });

  // }
  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders.map(order => {
        const timestamp = order.dateOrdered as unknown as firebase.firestore.Timestamp;
        return {
          ...order,
          dateOrdered: timestamp?.toDate() || null // set dateOrdered to null if the timestamp is null
        };
      });
    });
  }

  onSelect(order: Order): void {
    this.selectedOrder = order;
  }

  // onUpdateStatus(order: Order): void {
  //   const orderWithStatus: OrderWithStatus = {
  //     ...order,
  //     status: 'Shipped'
  //   };
  //   this.orderService.updateOrderStatus(orderWithStatus).then(() => {
  //     alert('Order status updated successfully');
  //   });
  // }
  onUpdateStatus(order: OrderWithStatus): void {
    console.log('order:', order);
    console.log('selectedStatus:', this.selectedStatus);
    if (order.status !== this.selectedStatus) {
      const orderWithStatus: OrderWithStatus = {
        ...order,
        status: this.selectedStatus
      };
      this.orderService.updateOrderStatus(orderWithStatus).then(() => {
        alert('Order updated successfully');
      });
    }
  }
  // onStatusChange(): void {
  //   if (this.selectedOrder && this.selectedStatus) {
  //     const orderWithStatus: OrderWithStatus = {
  //       ...this.selectedOrder,
  //       status: this.selectedStatus
  //     };
  //     this.orderService.updateOrderStatus(orderWithStatus).then(() => {
  //       console.log("iam working ");
  //       alert('Order status updated successfully');
  //     });
  //   }else{
  //     console.log("Iam not working");
  //   }
  // }
  onStatusChange(): void {
    if (this.selectedOrder && this.selectedStatus) {
      const orderWithStatus: OrderWithStatus = {
        ...this.selectedOrder,
        status: this.selectedStatus
      };
      this.orderService.updateOrderStatus(orderWithStatus).then(() => {
        console.log("I am working");
        alert('Order status updated successfully');
      });
    } else {
      console.log("I am not working");
    }
  }





  onCancelOrder(order: Order): void {
    order.status = 'Cancelled';
    this.orderService.cancelOrder(order).subscribe(() => {
      alert('Order cancelled successfully');
    });
  }

  onRefundOrder(order: Order): void {
    // order.status = 'Refunded';
    this.orderService.refundOrder(order).subscribe(() => {
      alert('Order refunded successfully');
    });
  }


}
