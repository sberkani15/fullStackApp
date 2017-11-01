import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name:string;
  public username:string;
  public email:string;
  public password:string;

  constructor(private _authService:AuthService, private _flashMessagesService: FlashMessagesService, private _router: Router) { }

  ngOnInit() {
  }

public validateForm(register){
console.info(register);
if (register.name ===undefined || register.username ===undefined || register.password ===undefined || register.email===undefined){
  this._flashMessagesService.show('veuillez remplir tout les champs', {cssClass:'alert-danger', timeout:3000})

}else{
    this._authService.registerUser(register).subscribe(
    data=>{
      if (data.success){
        this._flashMessagesService.show('succès enregistrement !!', { cssClass: 'alert-success', timeout: 3000 });
        this._router.navigate(['login']);
      }else{
        this._flashMessagesService.show('echec enregistrement', { cssClass: 'alert-danger', timeout: 3000 });
      }
    }
  )
}
 
} 
}
