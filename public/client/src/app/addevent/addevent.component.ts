import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  @ViewChild('f') eventform: NgForm

  constructor(public snackBar: MatSnackBar,private router: Router,private http: HttpClient) { }
  date: Date = new Date();
  date1: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'yyyy-MM-dd',
    defaultOpen: false
  }
  ngOnInit() {
  }
  addevent() {
    console.log(this.eventform.value.username)
    console.log(this.date)
    this.http.post('http://localhost:1337/user/addevent',{start:this.date,end:this.date1,title:this.eventform.value.username}, { withCredentials: true }).subscribe(data => {
      console.log(data)
      this.snackBar.open('Event Added' , 'ok', {
        duration: 2000
      });
      this.router.navigate(['/']);
    })
  }

}
