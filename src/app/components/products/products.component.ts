import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  showProductDetail = false;
  // Initialize the product object
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  }
  statusDetail: 'init' | 'success' | 'error' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }


  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowProductDetails(id: string): void{
    this.showProductDetail = true;
    this.productsService.getById(id).subscribe({
      next:  (res) => {
        this.productChosen = res;
        this.statusDetail = 'success'
       },
      error: (error) => console.log(error),
      complete: () => console.log('Complete')
    })
  }

  createProduct(){
    const productDTO: CreateProductDTO = {
      title: 'New product',
      description: 'Veniam exercitationem totam iure quasi aliquam. Ut hic labore occaecati. Aspernatur corrupti rem aut nostrum necessitatibus in debitis culpa. Dolorem provident vitae a sit nemo commodi et. Id et laborum qui odit blanditiis voluptatum odio.…',
      price: 199,
      images: ['https://placeimg.com/640/480/any?random=$%7BMath.random()%7D', 'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D', 'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D'],
      categoryId: 3
    }
    this.productsService.create(productDTO).subscribe(res => {
      this.products.unshift(res);
    });
  }

  /**
   * Get the element of the product's array and update with the selected product with the changes declared in the method
   */
  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'Updated title'
    }
    const id: string = this.productChosen.id;

    this.productsService.update(id, changes).subscribe(res => {
      let productIndex = this.products.findIndex(product => {
        product.id === res.id;
      });

      this.productChosen = res;
      this.products[productIndex] = res;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
    let productIndex = this.products.findIndex(item =>  item.id === id);
    this.products.splice(productIndex, 1);
    this.showProductDetail = false;
    });
  }

  @Output() loadMoreProducts = new EventEmitter();
  loadMore(){
    this.loadMoreProducts.emit();
  }
}
