import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpStatusModule } from 'http-status-pipe';
import { AuthService, AuthGuard } from './shared/auth/index';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SecureComponent } from './pages/secure/secure.component';

import { NavbarComponent } from './partials/navbar/navbar.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'error/:status_code',
        component: ErrorComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/logout',
        component: LogoutComponent
    },
    {
        path: 'secure',
        component: SecureComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }

];


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent,
        LoginComponent,
        LogoutComponent,
        SecureComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpStatusModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
