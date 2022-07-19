
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { OrderDetails } from './classes/order-details';
import { Orders } from './classes/orders';
import { Product } from './classes/product';
import { User } from './classes/user';

@Injectable({
  providedIn: 'root'
})
export class CrudHttpService {

  apiUrl: string = 'http://localhost:3000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  


  constructor(private http: HttpClient) { }


  getUser(): Observable<any> {
   
    return this.http.get<any>(`${this.apiUrl}user`);
  }

  // Read
  list(categoryName:string) {
    return this.http.get<Product[]>(`${this.apiUrl}foodProducts?category=${categoryName}`);
  }

  listOrders()
  {
    
    return this.http.get<Orders[]>(`${this.apiUrl}orderItems`);
    
  }

  listOrderDetail()
  {
    return this.http.get<any>(`${this.apiUrl}orderDetails`);
  }
  

  create(data: Orders): Observable<any> {

    
    {
      let API_URL = `${this.apiUrl}orderItems`;
      return this.http.post(API_URL, data)
        .pipe(
         catchError(this.handleError)
      )
    }
    
    
  }

  update(data:Orders,id:number)
  {
    let API_URL = `${this.apiUrl}orderItems/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  updateDetails(data:OrderDetails,id:number)
  {
    let API_URL = `${this.apiUrl}orderDetails/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(data:any,id:number)
  {
    let API_URL = `${this.apiUrl}user/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    var API_URL = `${this.apiUrl}orderItems/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  search(input:string)
  {
    return this.http.get<Product[]>(`${this.apiUrl}foodProducts?q=${input}`);
  }

  

   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}



