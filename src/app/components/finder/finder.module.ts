import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinderRoutingModule } from './finder-routing.module';
import { FinderComponent } from './finder.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterModule } from '../register/register.module';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    FinderComponent,
  ],
  imports: [
    CommonModule,
    FinderRoutingModule,
    RegisterModule,
    FormsModule,
    NgxMaskModule.forChild(),
    NgxLoadingModule.forRoot({}),
  ]
})
export class FinderModule { }
