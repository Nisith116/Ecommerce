import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import { Observable } from 'rxjs';


import { map, filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate {

  constructor(private auth:AuthService,private userService:UserService) { }

  canActivate():Observable<boolean>{
     return this.auth.$user
    .pipe(switchMap(user => {
       return this.userService.getUser(user.uid).valueChanges()
    })).pipe(map(appUser=>{
      return appUser.isAdmin
    }))
  }
}
