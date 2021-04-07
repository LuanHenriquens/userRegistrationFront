import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinderComponent } from '../finder/finder.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  { path: ':id', component: RegisterComponent },
  { path: '', component: RegisterComponent },
  { path: 'finder', component: FinderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
