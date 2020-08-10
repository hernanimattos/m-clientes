interface Regiao {
  id: number;
  singla: string;
  nome: string;
}

export interface Uf {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}
