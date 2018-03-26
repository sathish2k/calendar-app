import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  userdata: object;

  constructor(private router: Router,  private http: HttpClient) {}
  isAuthenticated() {
    return this.http.post('http://localhost:1337/user/checksession', {data: 's'}).toPromise()
     .then(data => {
       this.userdata = data;
       if (this.userdata) {
         console.log(this.userdata);
          return true;
         }
         this.router.navigate(['/login']);
         return false;
     });
   }
}