import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AddeventComponent } from './addevent/addevent.component';
import { AuthGuard } from './login/auth-gaurd.service';
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: '',
            component: HomeComponent,
            canActivate: [AuthGuard]
        },{
            path:'addevent',
            component:AddeventComponent,
            canActivate: [AuthGuard]
        }]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]