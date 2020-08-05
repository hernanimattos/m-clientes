import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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

  newClientForm = this.fb.group({
    nome: [null, Validators.required],
    cpf: [null, Validators.required],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    bairro: [null, Validators.required],
    localidade: [null, Validators.required],
    uf: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}
  onSubmit() {
    console.warn(this.newClientForm, 'kkkkk');
  }

  ngOnInit(): void {}
}
