import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {Code404Component} from './code404/code404.component';
import {ProductDescComponent} from './product-desc/product-desc.component';
import {SellerInfoComponent} from './seller-info/seller-info.component';
import {ChatComponent} from './chat/chat.component';
import {LoginGuard} from './guard/login.guard';
import {UnsavedGuard} from './guard/unsaved.guard';
import {ProductResolve} from './guard/product.resolve';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, //重定向路由
  {path: 'chat', component: ChatComponent, outlet: 'aux'},
  {path: 'home', component: HomeComponent},
  // {path: 'product', component: ProductComponent},
  {path: 'product/:id', component: ProductComponent,
    children: [
      {path: '', component: ProductDescComponent},
      {path: 'seller/:id', component: SellerInfoComponent},
      ]
     // , canActivate: [LoginGuard], canDeactivate: [UnsavedGuard]
    , resolve: {product: ProductResolve}
  },
  // 通配符路由放在最后面
  {path: '**', component: Code404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard, UnsavedGuard, ProductResolve ] // 依赖注入 路由守卫模块
})
export class AppRoutingModule {
}
