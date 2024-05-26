import { Routes } from '@angular/router';
import { DashComponent } from './pages/dash/dash.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ItemComponent } from './pages/item/item.component';
import { AccountComponent } from './pages/auth/account/account.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { DashAdminComponent } from './pages/admin/dash-admin/dash-admin.component';
import { PedidosComponent } from './pages/admin/pedidos/pedidos.component';
import { ProductComponent } from './shared/comps/product/product.component';
import { ProdutosComponent } from './pages/admin/produtos/produtos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'd' },
  {
    path: 'admin',
    component: DashAdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'orders' },
      { path: 'orders', component: PedidosComponent },
      { path: 'products', component: ProdutosComponent }
    ]
  },
  {
    path: 'd',
    component: DashComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'item', component: ItemComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'orderList', component: OrderListComponent }
    ],
  },{
    path: 'a',
    component: AccountComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];
