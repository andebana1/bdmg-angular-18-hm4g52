import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { IbgeService } from './services/ibge.service';
import { Address } from './models/address.model';
// import { } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private ibgeService = inject(IbgeService);
  private fb = inject(FormBuilder);
  ibgeForm?: FormGroup;

  constructor () {
    this.ibgeForm = this.initForm();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      cep: this.fb.control('', [Validators.required]),
      logradouro: this.fb.control('', [Validators.required]),
      complemento: this.fb.control('', [Validators.required]),
      unidade: this.fb.control('', [Validators.required]),
      bairro: this.fb.control('', [Validators.required]),
      localidade: this.fb.control('', [Validators.required]),
      uf: this.fb.control('', [Validators.required]),
      estado: this.fb.control('', [Validators.required]),
      regiao: this.fb.control('', [Validators.required]),
      ibge: this.fb.control({value: '', disabled: true}, [Validators.required]),
      gia: this.fb.control('', [Validators.required]),
      ddd: this.fb.control('', [Validators.required]),
      siafi: this.fb.control({value: '', disabled: true}, [Validators.required]),
    });
  }
  
  fetchAddressData() {
    const cep = this.ibgeForm?.get('cep')?.value;
    if (cep) {
      this.ibgeService.getAddressByCep(cep)
        .subscribe((address: Address) => {
          this.ibgeForm?.patchValue({...address});
        });
    }
  }

  valid(): boolean {
    return this.ibgeForm?.get('ibge')?.value && this.ibgeForm?.get('siafi')?.value && this.ibgeForm.valid;
  }

  saveAddress() {
    const address = this.ibgeForm?.value;
    if (address) {
      this.ibgeService.saveAddress(address);
      this.ibgeForm?.reset();
    }
  }
}
