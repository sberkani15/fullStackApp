import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:AuthService, private _flashMessagesService: FlashMessagesService, private _router: Router) { }

  ngOnInit() {
  }

  username:string;
  password:string;

  validateAuth(auth){
if (auth.username === undefined || auth.password ===undefined){
    this._flashMessagesService.show('Veuillez saisir le login et le mot de passe', { cssClass: 'alert-danger', timeout: 3000 });

}else{
  this._authService.authenticate(auth).subscribe(
      data=>{
          if (data.success){
            this._flashMessagesService.show('success authentification', { cssClass: 'alert-success', timeout: 3000 });
            this._router.navigate(['dashboard'])
          }else{
            this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            this._router.navigate(['login'])
          }
      }
      )
}
  
  }

}
