import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {MatToolbarModule,MatIconModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatCardModule, MatInputModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import { FullCalendarModule } from 'ng-fullcalendar';
import {HttpClientModule} from '@angular/common/http';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { AddeventComponent } from './addevent/addevent.component';
import {AuthService} from './login/auth.service';
import {AuthGuard} from './login/auth-gaurd.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AddeventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    FullCalendarModule,
    HttpClientModule,
    AngularDateTimePickerModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
