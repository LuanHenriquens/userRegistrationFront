import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { FinderComponent } from './finder.component';

const routes: Routes = [
  { path: '', component: FinderComponent },
  { path: '/src/app/components/register', component: RegisterComponent},
  { path: '/src/app/components/register/:id', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinderRoutingModule { }
