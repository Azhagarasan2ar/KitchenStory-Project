import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { OrderDetails } from '../classes/order-details';
import { Orders } from '../classes/orders';
import { Product } from '../classes/product';
import { CrudHttpService } from '../crud-http.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public loginForm!:FormGroup;

  bestSellerList:Product[];
  todaySpecialList:Product[];
  orderItems:Orders[]=[];
  
  searchResult:any=[];
  orderItemsList:any=[];

  orderDetails:any;

  user:string;

  orderItemId:number=0;
  totalPrice:number=0;
  quantity:number=1;
  orderedItemQuantity=0;


  constructor(private crudHttpService: CrudHttpService,private router: Router,private formBuilder:FormBuilder,private userService:UserServiceService) 
  {
    
   }

  ngOnInit(): void {
    this.user=this.userService.getUser();
    console.log(this.user);
    
    this.listBestSellers();
    this.listTodaySpecial();
    this.listOrderItem();
    this.listOrderDetails()

    this.loginForm= this.formBuilder.group({
      search:['']
      
    })
  }

  listBestSellers(){
    this.crudHttpService.list("BestSeller").subscribe((response)=>{
      this.bestSellerList = response;
    },(error=>{

    }));
  }

  listOrderItem(){
    this.crudHttpService.listOrders().subscribe((response)=>{
      this.orderItems= response;
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
      
    },(error=>{

    }));
    
    
  }


  listTodaySpecial(){
    this.crudHttpService.list("TodaySpecial").subscribe((response)=>{
      this.todaySpecialList = response;
    },(error=>{

    }));
  }

  login()
  {
    this.router.navigate(['login']);
  }
  goToChangePassword()
  {
    this.router.navigate(['changePassword']);
  }

  logout()
  {
    this.user='';
    this.userService.deleteUser(undefined);
    alert("Logout successful");
    }

  orderItem(product:Product)
  {
    let orders:Orders = {
      id:product.id,
      productName: product.productName,
      price:product.price,
      quantity:this.quantity
    }
    this.totalPrice+=product.price;
    this.orderedItemQuantity+=1;

    let filterOrder=this.orderItems.filter((item)=>{
      return item.id===product.id;
    });
    console.log(filterOrder);

    if(Object.keys(filterOrder).length===0)
    {
      
      this.crudHttpService.create(orders).subscribe((response)=>{
        this.listOrderItem();
        },(error=>{
      
        }));
    
    }
    
    else
    {
      this.orderItems.forEach((item)=>{
        if(item.id===product.id)
        {
          item.quantity+=1;
          orders.quantity=item.quantity;

          this.crudHttpService.update(orders,product.id).subscribe((response)=>{
            this.listOrderItem;
          },(error=>{
      
          }));
        }
      })     
    }

  } 
       
  deleteItem(id:number)
  {
    this.orderItems.forEach((item,index)=>{
      if(item.id==id) 
      {
      this.orderItems.splice(index,1);
      this.totalPrice-=item.price*item.quantity;
      this.crudHttpService.delete(id).subscribe((response)=>{
        this.listOrderItem();
      },(error=>{
      }));
      }
    });
    
  }

  doSearch()
  {
    console.log(this.loginForm.value.search);
    let searchItem=this.loginForm.value.search;

    if(searchItem!='')
    {
      this.crudHttpService.search(searchItem).subscribe((response)=>{
        this.searchResult = response;
      },(error=>{
  
      }));
    }
  }

  ngOnDestroy()
  {
    let orderDetail:OrderDetails={
      
        id:1,
        userName:"azhagarasan",
        emailId:"azhagarasan3432@gmail.com",
        totalPrice:this.totalPrice,
        orderedItems:this.orderedItemQuantity,
        address:""
      
    }
    
    this.crudHttpService.updateDetails(orderDetail,orderDetail.id).subscribe((response)=>{
      this.listOrderDetails;
    },(error=>{

    }));
  }

 
}
