import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService, HttpService } from 'dist/utils';
import { cepReponse } from '../shared/models/cepResponse.model';
import { Client } from '../shared/models/client.model';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent implements OnInit {
  private urlCepApi: string = 'https://viacep.com.br/ws/';
  private urlUFAPi: string =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

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

  // public nome: string;

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
    private _http: HttpService
  ) {}
  ngOnInit(): void {
    // this.setCep();
  }

  private setCepSearchResult(address: cepReponse) {
    this.newClientForm.patchValue({
      address: {
        ...address,
      },
    });
  }

  isFieldValid(field: string) {
    console.log(
      !this.newClientForm.get(field).valid &&
        this.newClientForm.get(field).touched &&
        this.newClientForm.get(field).pristine,
      'llll'
    );
    return (
      !this.newClientForm.get(field).valid &&
      this.newClientForm.get(field).touched
    );
  }

  displayError(field: string) {
    return {
      'is-danger': this.isFieldValid(field),
      'help-error': this.isFieldValid(field),
    };
  }

  public getCep(event) {
    const value = event.target.value;
    this._http
      .get(`${this.urlCepApi}/${value}/json/`)
      .subscribe((cep: cepReponse) => {
        // this.setCep(cep);this.setCepSearchResult(cep)
        this.setCepSearchResult(cep);
      });
  }

  private setCep() {
    console.log('llll', this.newClientForm);

    // this;

    // this.nome = 'aquii';
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
