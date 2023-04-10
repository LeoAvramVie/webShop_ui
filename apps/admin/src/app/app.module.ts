import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ShellComponent} from './shared/shell/shell.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {CategoriesListComponent} from './pages/categories/categories-list/categories-list.component';
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CategoriesService} from "@lav/products";
import {CategoriesFormComponent} from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ColorPickerModule} from "primeng/colorpicker";
import {ProductFormComponent} from './pages/products/product-form/product-form.component';
import {ProductListComponent} from './pages/products/product-list/product-list.component';
import {InputNumberModule} from "primeng/inputnumber";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import {UsersFormComponent} from './pages/users/users-form/users-form.component';
import {UsersListComponent} from './pages/users/users-list/users-list.component';
import {DashboardService, JwtInterceptor, UsersModule, UsersService} from "@lav/users";
import {TagModule} from "primeng/tag";
import {InputMaskModule} from "primeng/inputmask";
import {OrdersListComponent} from "./pages/orders/orders-list/orders-list.component";
import {OrdersDetailComponent} from "./pages/orders/orders-detail/orders-detail.component";
import {OrdersService} from "@lav/orders";
import {FieldsetModule} from "primeng/fieldset";
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductFormComponent,
    ProductListComponent,
    UsersFormComponent,
    UsersListComponent,
    OrdersDetailComponent,
    OrdersListComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    InputTextareaModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule,
    UsersModule
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    UsersService,
    DashboardService,
    OrdersService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
