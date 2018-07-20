import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Account } from './models/account';
import * as jwt_decode from 'jwt-decode';

import { Observable} from 'rxjs';
import { map,catchError } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
    
    _baseURL = "https://dev-test-service.madebywiser.com";
    _userName = "";

    public profile$: Subject<Account> = new BehaviorSubject<Account>(undefined);

    constructor(private http: HttpClient) {
      
    }

    async login(username: string, password: string){
        return this.getToken(username, password)
            .then((data)=>
            {
                this._userName = username;
                localStorage.setItem(username, JSON.stringify({ username: username, token: data }));

                this.profile$.next({
                    username: username;
                    password: password;
                    expires: 0; 
                    });

                return true;
            })
            .catch(error=>
            { 
                return false;
            });
    };

    private async getToken(username: string, password: string): Promise<any> {

        const url: string = this._baseURL + "/login";

        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        });

        const responseType: any = 'text';

        const config = {
            responseType,
            headers
        };

        return await this.http.get<string>(url, config).toPromise<string>();
    }


    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.expires === undefined) return null;

        const date = new Date(0); 
        date.setUTCSeconds(decoded.expires);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if(this._userName == "") return true;
        if(!token) token = this.getLocalToken();
        if(!token) return true;

        const date = this.getTokenExpirationDate(token);

        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    getLocalToken(): string {
        return localStorage.getItem(this._userName);
    }

    async logout() {
        // remove user from local storage to log user out
        this._userName = "";
        localStorage.removeItem(this._userName);
        
        this.profile$.next(undefined);

        return true;
    }
}
