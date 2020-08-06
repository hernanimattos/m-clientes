import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  {
    path: 'clients',
    component: ListClientsComponent,
  },
  {
    path: 'novo-cliente',
    component: NewClientComponent,
  },
  {
    path: 'edit/:id',
    component: EditClientComponent,
  },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
