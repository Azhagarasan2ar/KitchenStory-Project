import { Injectable } from '@angular/core';
import { User } from './classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public userName:string;
  public email:string;

  public user:User;


  constructor() { }

  public getUser():string
  {
    return this.userName;
  }

  public setUser(array:any)
  {
    console.log(array);
    this.user=new User(array[0].id,array[0].username,array[0].email);
    this.userName=array[0].username;
    this.email=array[0].email
    console.log(this.user);   
  }

  public deleteUser(array:any)
  {
    console.log(this.user);
    this.userName='';
    this.email='';
    this.user=array;
    console.log(this.user);
  }
}
