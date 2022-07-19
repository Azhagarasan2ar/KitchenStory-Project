import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { User } from '../classes/user';
import { CrudHttpService } from '../crud-http.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  public loginForm!:FormGroup;
 
  constructor(private formBuilder:FormBuilder,private crudHttpService:CrudHttpService,private router:Router,private user:UserServiceService)
  { }

  ngOnInit(): void {
   
    this.loginForm= this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
   
  }

  login()
  {
    this.crudHttpService.getUser().subscribe(response=>{
      let array=response.filter((userDB:any)=>{
        
         return userDB.email===this.loginForm.value.email && userDB.password==this.loginForm.value.password;
         
      })
     
      
      if(array.length!=0)
      {
       
        this.user.setUser(array);
        alert("Login success");
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
      else
      {
        alert("user not found");
        this.loginForm.reset();
      }

    },err=>{
      alert("Something went wrong!")
    })
    
  }


  



}