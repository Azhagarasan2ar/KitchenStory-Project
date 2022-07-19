import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { CrudHttpService } from '../crud-http.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public loginForm!:FormGroup;
 
  constructor(private formBuilder:FormBuilder,private crudHttpService:CrudHttpService,private router:Router)
  { }

  ngOnInit(): void {
   
    this.loginForm= this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
      newPassword:['',Validators.required]
    })
   
  }

  login()
  {
    this.crudHttpService.getUser().subscribe(response=>{
      let array=response.filter((userDB:any)=>{
        
         return userDB.email===this.loginForm.value.email && userDB.password==this.loginForm.value.password;
         
      })
     
      
      if(array.length!=0 && this.loginForm.value.newPassword!='')
      {
        console.log(typeof(this.loginForm.value.newPassword));
        array[0].password=Number(this.loginForm.value.newPassword);
      

        this.crudHttpService.updateUser(array[0],array[0].id).subscribe((response)=>{
          alert("Password updated");
        },(error=>{
    
        }));
       
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }
      else
      {
        alert("Incorrect Email Id or Password");
        this.loginForm.reset();
      }

    },err=>{
      alert("Something went wrong!")
    })
    
  }

}
