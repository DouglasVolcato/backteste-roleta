import { Lance } from "./lance";

export type ConfiguracaoBackteste = {
  tamanhoLoop: number;
  bancaInicial: number;
  alvo: number;
  stop: number;
  lances: Lance[];
};
