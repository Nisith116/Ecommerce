import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  
count:number=0
  constructor(public afAuth: AuthService,
    private cart:CartService) { 
    
  }

  logout(){
    this.afAuth.logout()
  }

  ngOnInit(){
    this.cart.getCount
  }
   

}
