import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token: string = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.getAllCategories();
  }

  public login(){
    this.authService.fetchLoginAndProfile('john@mail.com', 'changeme').subscribe({
      next: (res) => this.profile = res
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories(){
    this.categoriesService.getAll().subscribe({
      next: (res) => this.categories = res,
      error: () => console.error('Error')
    })
  }

}
