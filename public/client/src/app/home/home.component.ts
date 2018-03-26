import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  calendarOptions: Options;
  displayEvent:any[];
  events: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private http: HttpClient) { }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
  ngOnInit() {

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
    this.http.post('http://localhost:1337/user/getevents', { withCredentials: true }).subscribe(data => {
      console.log(data)
      this.events = data;
      this.ucCalendar.fullCalendar('rerenderEvents');
    })

  }
 
  eventClick(model: any) {
    model = {
        start: model.event.start._i,
        end: model.event.end._i,
        title: model.event.title
    }
    this.displayEvent = [model];
    console.log(this.displayEvent)

  }
  clickButton(e){
    console.log(e)
  }

}
