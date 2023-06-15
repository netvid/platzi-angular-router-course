import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{
  productId: string | null = null;
  product: Product | null = null;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
    ){}

  public ngOnInit(): void{
    this.route.paramMap.pipe(
      switchMap((res) => {
        this.productId = res.get('id');
        if(this.productId)  return this.productsService.getById(this.productId)
        // Otherwise return null
        return [null]
      })
    ).subscribe({
      next: (res) => this.product = res
    })
  }

}
