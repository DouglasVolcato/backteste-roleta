import { Coluna } from "../enums/numero/coluna";
import { Cor } from "../enums/numero/cor";
import { Duzia } from "../enums/numero/duzia";
import { Tamanho } from "../enums/numero/tamanho";
import { Tipo } from "../enums/numero/tipo";

export type Numero = {
  numero: number;
  tipo: Tipo;
  cor: Cor;
  tamanho: Tamanho;
  duzia: Duzia;
  Coluna: Coluna;
};
