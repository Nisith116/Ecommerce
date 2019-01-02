import { Component, OnInit, ViewChild, ElementRef ,Renderer2, OnDestroy, Output, EventEmitter} from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  data:any[]
  AllProducts:any[]=[]
  products:any[]
  filteredCategory:any = []
  cartBtn:any = true
  count=0;
  presentCartProducts:any[]=[]
  countDOM:any=0
  cartProducts:any
  cartFlag:boolean = true
  tag:any
  val:any
  prevKey:any
  initialCount:any=0
  finalCount:any=0
  countProduct: any=0;
  constructor(private categoryService: CategoryService,
  private productService:ProductService,
  private router: Router,
  private route:ActivatedRoute,
  private cart:CartService,
  private renderer:Renderer2
  )
 {
    this.categoryService.getCategory().subscribe(a=>this.data=a)
    this.productService.getAll().subscribe(b=>this.filteredCategory=this.products=b)
    this.cart.getCartProduct().subscribe(a=>this.cartProducts=a);
    
    
   }

   
  @ViewChild('count') countRef:ElementRef
  @Output() countChanged = new EventEmitter()

  ngOnInit() {
    this.getData()
    // this.dataExtraction()
    
  
    
  }


    getData(){
      
    }
  showProduct(category){
    console.log(category)

   this.filteredCategory = (category)? this.products.filter(p=>p.data.category.toLowerCase().includes(category.toLowerCase())):this.products
   console.log(this.filteredCategory);
   
    this.router.navigate(['/'],{queryParams: {category: category}}
    
      
     ) }

     addExisting(a,id,product){
      if(a.key == id){
        // this.cartBtn = false
      // if(a.count != null){
        if(this.prevKey != a.key){
          this.initialCount = a.count
          this.countDOM = 0
        }
        if(this.countDOM == 0){
          
        }
         
        ;
        // console.log('hoo');
        
        this.cartBtn = false
        this.cartFlag = false
        this.prevKey = a.key
        // console.log(a.key);
        
        
        
        
        product['count'] = a.count + 1
        this.countDOM = product['count']
        this.cart.updateCartproduct(id,product)
        this.finalCount = product['count']
        
        // console.log(this.countDOM);
        
        this.renderer.createText(this.countRef.nativeElement.textContent = this.countDOM ) 
         
      // }
         
    //  }else{
    //   if(this.cartBtn){
    //     this.countDOM=0
    //     product['count'] = 1
    //     this.countDOM += 1 
        
    //     this.cart.updateCartproduct(id,product)
    //     this.renderer.createText(this.countRef.nativeElement.textContent = this.countDOM ) 
    //     this.cartBtn = false
    //   }
       
    //  }

 } 
     }

dataExtraction(){
  for (let index = 0; index < this.cartProducts.length; index++) {
    let data = this.cartProducts[index].payload.val()
    let key = this.cartProducts[index].payload.key
    data['key'] = key
    this.AllProducts[index] = data
    this.presentCartProducts[index] = key

    
     
   }
   
   
   
  
}



     addToCart(event,id,product,text){
      this.countProduct = 1
       this.dataExtraction()
       this.tag = id
      this.cartBtn = true
     
     this.val = this.highlightCartProduct(id)

    

      // if(this.AllProducts.length == 0){
      //   this.cartProducts.forEach(a=>{
      //     const data = a.payload.val()
      //     const key = a.payload.key
      //    this.AllProducts.push({key,data})
         
      //   })
      // }

      if(this.AllProducts.length == 0){
        product['key'] = id
        this.cart.updateCartproduct(id,product)
      }
   
      
       
       
       
         if(text == 'add'){
          // console.log("fgh");

          this.AllProducts.forEach(a=>{
            
            this.countProduct += a.count  
            // console.log(this.countProduct);
          })
          this.countChanged.emit(this.countProduct)
          this.AllProducts.forEach(a=>{
            
           
              // console.log(a.count);
              
            
            this.addExisting(a,id,product)
            // console.log(this.presentCartProducts);
            
      }
        )
        this.AllProducts.forEach(a=>{
        if(this.cartBtn){
          this.countDOM = 0
          product['count'] = 1
          this.countDOM += 1 
          //  console.log('hii');
           
           this.cart.updateCartproduct(id,product)
       this.renderer.createText(this.countRef.nativeElement.textContent = this.countDOM )
      }})
         }
         else{
          this.AllProducts.forEach(a=>{
            
            this.countProduct -= a.count  
            // console.log(this.countProduct);
          })
          this.countChanged.emit(-(this.countProduct))
          this.AllProducts.forEach(a=>{
            
              // console.log(a.count);
              
             
          
            if(a.key == id){
            if(a.count != null){
             this.countDOM = a.count
              this.cartFlag = false
              this.countDOM -= 1 
              if(this.countDOM < 1){
                this.cart.clearCartProduct(id)
              }
              if(this.countDOM>0){
                product['count'] = a.count - 1
               this.cart.updateCartproduct(id,product)
               this.renderer.createText(this.countRef.nativeElement.textContent = this.countDOM ) 
               
               this.cartBtn = false
              }
              
           }
          //  event.stopPropagation()
          //  else{
          //    if(this.countDOM > -1){
          //     product['count'] = 1
          //     this.countDOM -= 1 
              
          //     this.cart.updateCartproduct(id,product)
          //     this.renderer.createText(this.countRef.nativeElement.textContent = this.countDOM ) 
          //     if(this.countDOM==0){
          //      this.cart.clearCartProduct(id)
          //    }
          //     this.cartBtn = false
          //    }
             
          //  }

       } 
      
      
       
      }
        )
        
         }
          
      
      //  this.AllProducts.forEach(a=>{
      //   if(a.key == id){
      //   if(a.data.count != null){
      //     console.log(1);
        
      //     // product['count'] = a.data.count + 1
      //     //  this.cart.updateCartproduct(id,product)
      //  }else{
      //   // product['count'] = 1
      //   console.log(2);
        
        
      //   //  this.cart.updateCartproduct(id,product)
      //  }})
      
      
      // {
      //       product['count'] = 1
      //       console.log('hii');
            
      //       //  this.cart.updateCartproduct(id,product)
      //     }else if(this.cartProducts.hasOwnProperty('count') ){
      //     //  product['count'] = this.cartProducts.count + 1
      //     //  this.cart.updateCartproduct(id,product)
      //      console.log(this.cartProducts.count)
      //      }
      
        
       
       
     
      //   else{
      // //   product['count'] = 1
      //   console.log('hii');
        
      //   //  this.cart.updateCartproduct(id,product)
       event.preventDefault()
      event.stopPropagation()
      }

      highlightCartProduct(key){
        this.dataExtraction()

       this.AllProducts.forEach(a=>{
         if(a.key == key){
           console.log(a.count);
           
           this.countDOM = a.count
         }
       })
          // if(this.AllProducts[index].key == key){
          //   // console.log(this.AllProducts[index].count);
            
          //   // this.countDOM = this.AllProducts[index].count
          // }
          
        
        
        for (let index = 0; index < this.presentCartProducts.length; index++) {
          // console.log(key);
          
         if(this.presentCartProducts.includes(key)){
          // console.log('12');
           return true
           
         }else{
          //  console.log('45');
           
           return false
         }
        }
      }

     
      ngOnDestroy(){
        
      }
      //    } }
      } 
       
     
  
  


