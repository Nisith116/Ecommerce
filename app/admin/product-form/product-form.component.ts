import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$
  product={}
  id;
  constructor(private categoryService: CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute) {
    this.categoryService.getCategory().subscribe(a=>this.categories$=a)
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(a=>this.product=a)}
   console.log(this.categories$)
   }

  ngOnInit() {
  }

  save(product){
    
    console.log(product)
    if(this.id) this.productService.update(this.id, product)
    else this.productService.create(product)
    
    this.router.navigate(['/admin/products'])
    
  }


  delete(){
    if(!confirm('Are you sure want to delete the product')) return false;
    this.productService.deleteData(this.id)
    this.router.navigate(['/admin/products'])
  }

}
