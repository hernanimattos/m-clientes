import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService } from 'dist/utils';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent implements OnInit {
  // tslint:disable-next-line
  public cpfMask = [
    /[1-9]/,
    /\d/,
    /\d/,
    '.',
    /[1-9]/,
    /\d/,
    /\d/,
    '.',
    /[1-9]/,
    /\d/,
    /\d/,
    '-',
    /[1-9]/,
    /\d/,
  ];

  public cepMask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /[1-9]/, /\d/, /\d/];

  newClientForm = this.fb.group({
    nome: [null, Validators.required],
    cpf: [null, Validators.required],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    bairro: [null, Validators.required],
    localidade: [null, Validators.required],
    uf: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private stg: StorageService) {}

  private addClient(key, client) {
    const clients = this.stg.get(key);
    const d = new Date();
    const id = d.getTime();

    if (clients && clients.length > 0) {
      clients.push({ id, ...client });
      return this.stg.set(key, clients);
    }

    return this.stg.set(key, [{ id, ...client }]);
  }

  onSubmit() {
    console.warn(this.newClientForm.valid, 'kkkkk');
    this.addClient('clients', this.newClientForm.value);
  }

  ngOnInit(): void {}
}
