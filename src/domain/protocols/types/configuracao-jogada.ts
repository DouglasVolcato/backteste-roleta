import { Lance } from "./lance";

export type ConfiguracaoJogada = {
  bancaInicial: number;
  alvo: number;
  stop: number;
  lances: Lance[];
};
