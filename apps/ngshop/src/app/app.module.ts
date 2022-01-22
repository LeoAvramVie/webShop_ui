import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';

import {ProductListComponent} from './pages/product-list/product-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {UiModule} from "@lav/ui";
import {AccordionModule} from 'primeng/accordion';
import {NavComponent} from './shared/nav/nav/nav.component';
import {ProductsModule} from "@lav/products";


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    ProductsModule,
    AccordionModule,
    BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
