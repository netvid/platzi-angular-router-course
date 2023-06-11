import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private productsService: ProductsService){}
  public products: Product[] = [];

  private limit: number = 10;
  private offset: number = 0;

  public ngOnInit(): void {
    this.loadMore();
  }

  public loadMore(){
    this.productsService.getAllProducts(this.limit,this.offset).subscribe({
      next: (res) => this.products = this.products.concat(res),
      error: () => console.error('Error')
    })

    this.offset += this.limit;
  }
}
