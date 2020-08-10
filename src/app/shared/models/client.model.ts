interface Address {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export interface Client {
  id: string;
  nome: string;
  cpf: string;
  address: Address;
}
