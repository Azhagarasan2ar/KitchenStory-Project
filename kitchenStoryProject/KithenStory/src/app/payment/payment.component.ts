import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetails } from '../classes/order-details';
import { Orders } from '../classes/orders';
import { CrudHttpService } from '../crud-http.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  listOrderDetails: any;

  constructor(private crudHttpService:CrudHttpService,private router:Router) { }

  ngOnInit(): void {
  }

  myClickFunction() { 
    //just added console.log which will display the event details in browser on click of the button.
    alert("Thank You For The Payment");
    this.router.navigate(['dashboard']);
    
 }

 updateOrderDetail()
 {
    let orderDetail:OrderDetails={
      
      id:1,
      userName:"azhagarasan",
      emailId:"azhagarasan3432@gmail.com",
      totalPrice:0,
      orderedItems:0,
      address:""
  
    }

    this.crudHttpService.updateDetails(orderDetail,orderDetail.id).subscribe((response)=>{
    this.listOrderDetails;
    },(error=>{

    }));
  }

  DeleteOrderItems(){
    this.crudHttpService.listOrders().subscribe((response)=>{
      response.forEach((orderItem)=>{
        this.crudHttpService.delete(orderItem.id).subscribe((response)=>{
          
        },(error=>{
        }));
      })
    },(error=>{

    }));
    
  }

 ngOnDestroy()
 {
  
    this.updateOrderDetail();
    this.DeleteOrderItems();


  }

 }



