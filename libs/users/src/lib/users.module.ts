import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ],
    declarations: [
      LoginComponent
    ]
})
export class UsersModule {}
