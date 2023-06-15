import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        // The params will have the :number
        path: 'category/:id',
        component: CategoryComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'cart',
        component: MycartComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
