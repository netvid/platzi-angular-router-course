import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomStrategyService } from './services/custom-strategy.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then((res) => res.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./cms/cms.module').then((res) => res.CmsModule)
  },
  // Not found component
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomStrategyService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
