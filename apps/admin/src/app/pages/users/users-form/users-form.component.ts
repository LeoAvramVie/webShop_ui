import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "@lav/products";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {timer} from "rxjs";
import {User, UsersService} from "@lav/users";


@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsersFormComponent implements OnInit {


  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserID: string = null;
  countries = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private messageService: MessageService,
              private locationService: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.getCountries();
    this.checkEditMode();
  }

  onCancel() {
    this.locationService.back();
  }

  onSubmit() {
    this.isSubmitted = true
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserID,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      isAdmin: this.userForm.isAdmin.value,
      country: this.userForm.country.value,
      phone: this.userForm.phone.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      password: this.userForm.password.value,
    };
    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  private getCountries() {
    this.countries = this.userService.getCountries();
  }

  private initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isAdmin: [false],
      country: [''],
      phone: ['', Validators.required],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
    })
  }

  private addUser(user: User) {
    this.userService.createUser(user).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `User ${user.name} is created`
          });
        timer(1000).toPromise().then(() => {
          this.locationService.back();
        })
      },
      (() => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: `Category ${user.name} is NOT created`
          }
        );
      })
    );
  }

  private updateUser(user: Category) {
    this.userService.updateUser(user).subscribe(
      () => {
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: `User ${user.name} is edit`
          });
        timer(2000).toPromise().then(() => {
          this.locationService.back();
        })
      },
      (() => {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: `User ${user.name} is NOT edit`
          }
        );
      })
    );
  }

  private checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentUserID = params.id;
        this.userService.getUserById(params.id).subscribe(user => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.phone.setValue(user.phone);
          this.userForm.country.setValue(user.country);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }

}
