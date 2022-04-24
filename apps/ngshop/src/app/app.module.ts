import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {UiModule} from '@lav/ui';
import {AccordionModule} from 'primeng/accordion';
import {NavComponent} from './shared/nav/nav/nav.component';
import {ProductsModule} from '@lav/products';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OrdersModule} from '@lav/orders';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessagesComponent} from './shared/messages/messages.component';
import {JwtInterceptor, UsersModule} from "@lav/users";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
    declarations: [
      AppComponent,
      HomePageComponent,
      HeaderComponent,
      FooterComponent,
      NavComponent,
      MessagesComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      UiModule, ProductsModule,
      AccordionModule, OrdersModule,
      BrowserAnimationsModule,
      ToastModule,
      UsersModule
    ],
    providers: [
      MessageService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
