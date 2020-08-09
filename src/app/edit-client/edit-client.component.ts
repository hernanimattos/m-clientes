import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService } from 'dist/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../shared/models/client.model';

interface closest {
  (arg0: string): any;
}

interface target {
  closest: closest;
}

interface event {
  target: target;
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _stg: StorageService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}
  private id: String;
  private sub: any;
  public client: Client;

  ngOnInit(): void {
    this.sub = this._activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.client = this.getUserById(this.id);
    });
  }

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

  public editClientForm = this._fb.group({
    nome: [null, Validators.required],
    cpf: [null, Validators.required],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    bairro: [null, Validators.required],
    localidade: [null, Validators.required],
    uf: [null, Validators.required],
  });

  public showClientDetails(event: event) {
    const parent = event.target.closest('.card');
    const child = parent.querySelectorAll('.content-client')[0];
    child.classList.toggle('show');
  }

  public allowEditClientDetails(event: event) {
    const parent = event.target.closest('.card');
    const child = parent.querySelectorAll('.content-client')[0];
    const fildSetEdit = child.getElementsByTagName('fieldset')[0];

    fildSetEdit.toggleAttribute('disabled');
  }

  public getUserById(id: String) {
    return this._stg.get('clients').find((client: Client) => client.id == id);
  }

  public removeClient(id: String) {
    const clients = this._stg.get('clients');
    clients.map((client: Client, i: Number) => {
      if (client.id == this.id) {
        clients.splice(i, 1);
      }
      return client;
    });

    this._stg.set('clients', clients);
    this._router.navigateByUrl('/clients');
  }

  public findClientAndUpdate(value: Client) {
    const clients = this._stg.get('clients').map((client: Client) => {
      if (client.id == this.id) {
        client = { id: this.id, ...value };
      }
      return client;
    });
    this._stg.set('clients', clients);
  }

  public onSubmit() {
    this.findClientAndUpdate(this.editClientForm.value);
  }
}
