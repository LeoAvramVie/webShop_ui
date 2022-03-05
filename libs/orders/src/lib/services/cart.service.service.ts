import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartServiceService {
    constructor() {}

    initCartLocalStorage() {
        const initCart = {
            items: []
        };
        const initCartJson = JSON.stringify(initCart);
        localStorage.setItem('cart', initCartJson);
    }
}
