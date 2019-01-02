import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db :AngularFireDatabase) { 
  }

  create(product){
    this.db.list('/products').push(product)
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(map(item=>{
      return item.map(a=>{
        const data = a.payload.val()
        const key = a.payload.key
        return {key,data}
      })
    }))
  }

  get(id){
    return this.db.object('/products/' + id).valueChanges()
  }

  update(id, product){
   return this.db.object('/products/' + id).update(product)
  }

  deleteData(id){
    return this.db.object('/products/' + id).remove()
  }


  
}

