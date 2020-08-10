import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService } from 'dist/utils';

import { cepReponse } from '../shared/models/cepResponse.model';
import { Client } from '../shared/models/client.model';
import { Uf } from '../shared/models/uf.model';
import { ClientService } from '../shared/client.service';
import { event } from '../shared/models/event.model';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent implements OnInit {
  public ufs: Array<Uf>;

  public cpfMask = [
    /[0-9]/,
    /\d/,
    /\d/,
    '.',
    /[0-9]/,
    /\d/,
    /\d/,
    '.',
    /[0-9]/,
    /\d/,
    /\d/,
    '-',
    /[0-9]/,
    /\d/,
  ];

  public cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /[0-9]/, /\d/, /\d/];

  public newClientForm = this._fb.group({
    nome: [null, Validators.required],
    cpf: [null, Validators.required],
    address: this._fb.group({
      cep: [null, Validators.required],
      logradouro: [null, Validators.required],
      bairro: [null, Validators.required],
      localidade: [null, Validators.required],
      uf: [null, Validators.required],
    }),
  });

  constructor(
    private _fb: FormBuilder,
    private _stg: StorageService,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getUf();
  }

  private setCepSearchResult(address: cepReponse) {
    this.newClientForm.patchValue({
      address: {
        ...address,
      },
    });
  }

  public isFieldValid(field: string) {
    return (
      !this.newClientForm.get(field).valid &&
      this.newClientForm.get(field).touched
    );
  }

  public displayError(field: string) {
    return {
      'is-danger': this.isFieldValid(field),
      'help-error': this.isFieldValid(field),
    };
  }

  private setUf(ufs: Array<Uf>) {
    this.ufs = ufs;
  }

  private getUf() {
    this._clientService.getUf().subscribe((ufs: Array<Uf>) => {
      this.setUf(ufs);
    });
  }

  public getCep(event: event) {
    const value = event.target.value;
    this._clientService.getCep(value).subscribe((cep: cepReponse) => {
      this.setCepSearchResult(cep);
    });
  }

  private addClient(key: string, client: Client) {
    const clients = this._stg.get(key);
    const d = new Date();
    const id = String(d.getTime());

    if (clients && clients.length > 0) {
      clients.push({ id, ...client });
      return this._stg.set(key, clients);
    }

    return this._stg.set(key, [{ id, ...client }]);
  }

  private reset() {
    this.newClientForm.reset();
  }

  public onSubmit() {
    console.log(this.newClientForm);
    if (this.newClientForm.valid) {
      this.addClient('clients', this.newClientForm.value);
      this.reset();
    }
  }
}
