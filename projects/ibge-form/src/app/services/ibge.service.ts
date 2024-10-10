import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, of, tap } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private http = inject(HttpClient);
  private config = inject(ConfigService);

  constructor() { }

  getAddressByCep(cep: string): Observable<Address> {
    try {
      const cached = localStorage.getItem(cep);
      if (cached) {
        return of(JSON.parse(cached) as Address);
      }
    } catch (e) {
      throw e;
    }
    return this.http.get<Address>(`${this.config.cepURL}/${cep}/json`);
  }

  saveAddress(address: Address) {
    localStorage.setItem(address.cep, JSON.stringify(address));
  }
}
