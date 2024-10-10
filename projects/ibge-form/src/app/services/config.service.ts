import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(@Inject('CEP_URL') private cepUrl: string) { }

  get cepURL(): string {
    return this.cepUrl;
  }

}
