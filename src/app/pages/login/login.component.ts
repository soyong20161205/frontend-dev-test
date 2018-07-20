import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth/index';

import { trigger, state, style, animate, transition, useAnimation, AnimationEvent } from '@angular/animations';
import { shake } from 'ngx-animate';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
        trigger('shake', [
        state('false, true', style({})),
        transition('false => true', useAnimation(shake))])
        ],
    })

export class LoginComponent implements OnInit {

    usernameText = "wiserdev";
    passwordText = "password";

    shakeState: boolean = false;
    submitted = false;

    onSubmit() {
        this.submitted = true; 
        
        this.shakeState = false;
        
        console.log("submitt clicked");
        
        this.authService.login(this.usernameText, this.passwordText)
            .then((returnVal)=>
                {
                    if(returnVal)
                    {
                        console.log("success" + returnVal);
                        this.router.navigateByUrl('secure');
                    }
                    else
                    {
                        console.log("success" + returnVal);
                        setTimeout( () => {          
                            this.shakeState = true;
                            return;
                        }, 0 );
                        
                        this.usernameText = "";
                        this.passwordText = "";
                    }
                });
    }

    constructor(
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
    }

}
