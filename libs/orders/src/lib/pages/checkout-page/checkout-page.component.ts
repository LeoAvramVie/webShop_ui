import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "@lav/users";
import {CartService} from '../../services/cart.service';
import {OrdersService} from '../../services/orders.service';
import {Cart, Order, OrderItem} from "@lav/orders";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'lav-orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  checkoutFormGroup: FormGroup | undefined;
  isSubmitted = false;
  countries = [];
  orderItems: OrderItem[] = [];
  userId: string | undefined ;
  unsubscribe$:Subject<any> = new Subject()

  constructor(private router: Router,
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              private cartService: CartService,
              private ordersService: OrdersService) {
  }

  ngOnDestroy(): void {
       this.unsubscribe$.complete();
    }

  ngOnInit(): void {
    this.initCheckoutForm();
    this.authFillUserData();
    this.getCartItems();
    this.getCountries();
  }

  backToCart() {
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
    console.log("der Button")
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

  authFillUserData() {
    this.usersService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((userData) => {
      if (userData) {
        this.userId = userData?.id;
        this.checkoutForm?.['name'].setValue(userData?.name);
        this.checkoutForm?.['email'].setValue(userData?.email)
        this.checkoutForm?.['phone'].setValue(userData?.phone)
        this.checkoutForm?.['city'].setValue(userData?.city)
        this.checkoutForm?.['country'].setValue(userData?.country)
        this.checkoutForm?.['zip'].setValue(userData?.zip)
        this.checkoutForm?.['apartment'].setValue(userData?.apartment)
        this.checkoutForm?.['street'].setValue(userData?.street)
      }
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }
}
