import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  count: any;

  constructor(private db: AngularFireDatabase) { }

  getCartProduct = function(){
    return this.db.list('/ShoppingCart').snapshotChanges().pipe(map(item=>{
      return item
      })
     
    
    )}
    addProduct(product){
      this.db.list('/ShoppingCart/').push(product)
    }

  updateCartproduct(id,product){
    this.db.object('/ShoppingCart/' + id).set(product)
  }

  get(id){
    return  this.db.object('/ShoppingCart/' + id).valueChanges()
      
  }

  clearCartProduct(id){
    return  this.db.object('/ShoppingCart/' + id).remove()
  }

  getCount(count){
    this.count = count
    return this.count
  }
}
