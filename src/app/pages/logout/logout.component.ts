import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/index';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
    })

export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
        this.logout();
    }

    logout() 
    {
        this.authService.logout()
        .then((returnVal)=>
                {
                    if(returnVal)
                    {
                        setTimeout( () => { this.router.navigateByUrl('') }, 1500 );
                    }
                    else
                    {
                    
                    }
        });

    }

}
