import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from './services/cart.service.service';

@NgModule({
    imports: [CommonModule]
})
export class OrdersModule {
    constructor(cartService: CartServiceService) {
        cartService.initCartLocalStorage();
    }
}
