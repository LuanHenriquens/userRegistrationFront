import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { RegisterRoutingModule } from './register-routing.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    NgxMaskModule.forChild(),
    NgxLoadingModule.forRoot({}),
  ]
})
@Injectable({ providedIn: 'root' })
export class RegisterModule { }
