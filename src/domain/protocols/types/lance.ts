import { Coluna } from "../enums/numero/coluna";
import { Cor } from "../enums/numero/cor";
import { Duzia } from "../enums/numero/duzia";
import { Tamanho } from "../enums/numero/tamanho";
import { Tipo } from "../enums/numero/tipo";
import { ResultadoJogada } from "./resultado-jogada";

export type Lance = {
  indice: number;
  valor: number;
  incrementoPorLance: (jogadasAnteriores: ResultadoJogada[]) => number;
  alocacao: {
    numero?: number;
    tipo?: Tipo;
    cor?: Cor;
    tamanho?: Tamanho;
    duzia?: Duzia;
    Coluna?: Coluna;
  };
};
