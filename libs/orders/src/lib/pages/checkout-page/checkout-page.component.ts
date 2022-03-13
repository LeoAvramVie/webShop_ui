import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "@lav/users";
import {CartService} from '../../services/cart.service';
import {OrdersService} from '../../services/orders.service';
import {Cart, Order, OrderItem} from "@lav/orders";


@Component({
  selector: 'lav-orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class CheckoutPageComponent implements OnInit {

  checkoutFormGroup: FormGroup | undefined;
  isSubmitted = false;
  countries = [];
  orderItems: OrderItem[] = [];
  userId = '61d594d2d742a1b5765ec11c';

  constructor(private router: Router,
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.initCheckoutForm();
    this.getCartItems();
    this.getCountries();
  }

  backToCart(){
      this.router.navigate(['/cart'])
  }


  private getCartItems() {
    const cart: Cart = this.cartService.getCart();

    this.orderItems = cart?.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    }) as any;
    console.log(this.orderItems)
  }

  private getCountries() {
      this.countries = this.usersService.getCountries() as any;
  }

  private initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }


  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup?.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm?.['street'].value,
      shippingAddress2: this.checkoutForm?.['apartment'].value,
      city: this.checkoutForm?.['city'].value,
      zip: this.checkoutForm?.['zip'].value,
      country: this.checkoutForm?.['country'].value,
      phone: this.checkoutForm?.['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }
  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }
}
