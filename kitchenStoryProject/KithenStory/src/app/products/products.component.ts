import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { OrderDetails } from '../classes/order-details';
import { Orders } from '../classes/orders';
import { CrudHttpService } from '../crud-http.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  orderItemsList:Orders[]=[];
  orderDetails:OrderDetails;
  totalPrice:number=0;
  

  constructor(private crudHttpService: CrudHttpService,private router:Router,private userService:UserServiceService) { }

  ngOnInit(): void {
    this.listOrderItem();
    this.listOrderDetails();
  }

  
  
  listOrderItem()
  {
    this.crudHttpService.listOrders().subscribe((response)=>{
      this.orderItemsList = response;
    },(error=>{

    }));
    
  }

  listOrderDetails()
  {
    this.crudHttpService.listOrderDetail().subscribe(response=>{
      let order = response.filter((order:any)=>{
        if(order.id===1)
        {
          this.totalPrice=order.totalPrice;
          return order
        }
        return undefined
      })
      console.log(order);
      if(order)
      {
        this.orderDetails=order;
        console.log(this.orderDetails);
      }
    },(error=>{

    }));
    
    
  }


  btnClick=  () => {
    
    console.log(this.userService.getUser());
    if(this.userService.getUser()!='' && this.userService.getUser()!=undefined)
    {
      this.router.navigate(['payment']);
    }
    else
    {
      alert("You have to Login for making payment");
      this.router.navigate(['dashboard']);
    }
};

  


  

}


