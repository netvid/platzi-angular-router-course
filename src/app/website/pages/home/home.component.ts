import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  productId: string | null = null;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute

    ){}
  public products: Product[] = [];

  private limit: number = 10;
  private offset: number = 0;

  public ngOnInit(): void {
    this.loadMore();
    this.route.queryParams.subscribe({
      // Capture the product query params like ( ?product=1)
      next: (res) => this.productId = res.product
    })
  }

  public loadMore(){
    this.productsService.getAllProducts(this.limit,this.offset).subscribe({
      next: (res) => this.products = this.products.concat(res),
      error: () => console.error('Error')
    })

    this.offset += this.limit;
  }
}
