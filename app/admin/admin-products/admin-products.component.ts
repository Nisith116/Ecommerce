import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { DataTable } from 'angular-6-datatable';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products:any[]
  filteredProducts:any[]
  constructor(private productService:ProductService) { 
    this.productService.getAll().subscribe(a=>this.filteredProducts=this.products=a)
  }

  filter(query:string){
    this.filteredProducts = (query)?
    this.products.filter(p=>p.data.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())):
    this.products
  }

  ngOnInit() {
    
  }

}
