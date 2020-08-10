import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService } from 'dist/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../shared/models/client.model';
import { ClientService } from '../shared/client.service';
import { cepReponse } from '../shared/models/cepResponse.model';
import { event } from '../shared/models/event.model';
import { Uf } from '../shared/models/uf.model';
import { Observable } from 'rxjs';

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
    private _router: Router,
    private _clientService: ClientService
  ) {}
  private id: String;
  public client: Client;
  public ufs: Array<Uf>;

  ngOnInit(): void {
    this.getUf()
      .then((respo) => {
        this.ufs = respo;
      })
      .then(() => {
        this._activeRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.client = this.getUserById(this.id);
          this.editClientForm.patchValue({
            ...this.client,
          });
        });
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

  public cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /[0-9]/, /\d/, /\d/];

  public editClientForm = this._fb.group({
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

  private getUf(): Promise<any> {
    return Promise.resolve(this._clientService.getUf());
  }

  private setCepSearchResult(address: cepReponse) {
    this.editClientForm.patchValue({
      address: {
        ...address,
      },
    });
  }

  public getCep(event: event) {
    const value = event.target.value;
    this._clientService.getCep(value).subscribe((cep: cepReponse) => {
      this.setCepSearchResult(cep);
    });
  }

  private isFieldValid(field: string) {
    return (
      !this.editClientForm.get(field).valid &&
      this.editClientForm.get(field).touched
    );
  }

  public displayError(field: string) {
    return {
      'is-danger': this.isFieldValid(field),
      'help-error': this.isFieldValid(field),
    };
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
    console.log(this.editClientForm.value);
    this.findClientAndUpdate(this.editClientForm.value);
  }
}
