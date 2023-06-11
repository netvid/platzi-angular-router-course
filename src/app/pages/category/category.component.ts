import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  categoryId: string  | null = '';
  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;
  constructor(private productsService: ProductsService, private route: ActivatedRoute){}

  public ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (res) => {
        this.categoryId = res.get('id')
        this.loadMore();
      }
    })
  }

  public loadMore(){
    if(this.categoryId){
      this.productsService.getProductsByCategory(this.categoryId,this.limit,this.offset).subscribe({
        next: (res) => this.products = this.products.concat(res),
        error: () => console.error('Error')
      })
      this.offset += this.limit;
    }
  }
}
