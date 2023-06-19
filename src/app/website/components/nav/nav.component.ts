import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

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
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.authService.user$.subscribe({
      next: (user) => this.profile = user
    })

    this.getAllCategories();
  }

  public login(){
    this.authService.fetchLoginAndProfile('admin@mail.com', 'admin123').subscribe({
      next: () => this.router.navigate(['/profile'])
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

  public logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
