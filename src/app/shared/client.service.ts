import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'utils-clientes';
import { cepReponse } from './models/cepResponse.model';
import { Uf } from './models/uf.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly ibgeApiUF: string =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  private readonly urlCepApi: string = 'https://viacep.com.br/ws/';

  constructor(private _http: HttpService) {}

  public getUf(): Observable<any> {
    return this._http.get(this.ibgeApiUF);
  }

  public getCep<cepReponse>(cep: string): Observable<any> {
    return this._http.get(`${this.urlCepApi}/${cep}/json/`);
  }
}
