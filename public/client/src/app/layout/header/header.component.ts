import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userdata:any
  constructor(private router: Router,private http:HttpClient) { }

  ngOnInit() {
    this.http.post('http://localhost:1337/user/checksession',{withCredentials:true}).subscribe(data=>{
      console.log(data)
      this.userdata=data;
    })
  }
  logout(){
    this.http.post('http://localhost:1337/user/logout',{withCredentials:true}).subscribe(data=>{
      this.router.navigate(['/login'])
    })
  }
}
