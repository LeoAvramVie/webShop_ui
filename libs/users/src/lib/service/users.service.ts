import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "@lav/products";
import {User} from "../models/user";
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrlUsers = environment.apiUrl + 'users';

  constructor(private httpClient: HttpClient) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<Category[]>(this.apiUrlUsers)
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrlUsers, user)
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<Category>(`${this.apiUrlUsers}/${user.id}`, user)
  }

  deleteUser(userID: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrlUsers}/${userID}`)
  }

  getUserById(userID: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrlUsers}/${userID}`)
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    console.log('getCountry', countriesLib.getName(countryKey, 'en'))
    return countriesLib.getName(countryKey, 'en');
  }
}
