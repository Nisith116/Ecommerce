import { Component, OnInit,Output } from '@angular/core';
import { CartService } from '../cart.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  product:any[]=[];
  AllProducts:any[]=[]
  count:number=0
  constructor(private cart:CartService) { 
    
    
  }

  ngOnInit() {
    this.cart.getCartProduct().subscribe(a=>this.product=a);
    
    this.GetData()
    
  }

  GetData(){
    for (let index = 0; index < this.product.length; index++) {
      let data = this.product[index].payload.val()
      let key = this.product[index].payload.key
      data['key'] = key
      this.AllProducts[index] = data
      console.log(this.AllProducts);
      
       
       
     }
     

    console.log(this.count);
    this.cart.getCount(this.count)
  }

}
