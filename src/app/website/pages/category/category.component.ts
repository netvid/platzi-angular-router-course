import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `
    <app-products [productId]='productId' (loadMoreProducts)="loadMore()" [products]="products"></app-products>
  `,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  productId: string | null = null;
  categoryId: string  | null = '';
  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;
  constructor(private productsService: ProductsService, private route: ActivatedRoute){}

  public ngOnInit(): void{
    this.route.paramMap
    .pipe(
      switchMap((res) => {
        this.categoryId = res.get('id');
        if(this.categoryId) return this.productsService.getProductsByCategory(this.categoryId, this.limit, this.offset)
        // If we don't have nothing to send, send a empty list
        return [];
    })
    ).subscribe({
      next: (res) => {
        this.products = res;
      },
    });
    // Activate the sidebar product detail for each category
    this.route.queryParams.subscribe({
      next: (res) => this.productId = res.product
    })

  }

  public loadMore(){
    if(this.categoryId){
      this.offset += this.limit
      this.productsService.getProductsByCategory(this.categoryId,this.limit,this.offset).subscribe({
        next: (res) => this.products = this.products.concat(res),
        error: () => console.error('Error')
      })
      this.offset += this.limit;
    }
  }
}
