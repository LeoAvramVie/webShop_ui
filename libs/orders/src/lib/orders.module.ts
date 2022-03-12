import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartService } from './services/cart.service';
import { BadgeModule } from 'primeng/badge';

@NgModule({
    imports: [CommonModule, BadgeModule],
    providers: [],
    declarations: [CartIconComponent],
    exports: [CartIconComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
