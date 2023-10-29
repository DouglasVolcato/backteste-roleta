import { Backteste } from "./data/services/backteste";
import { ConfiguracaoBackteste, Cor, Tipo } from "./domain/protocols";

const configuracoesBackteste: ConfiguracaoBackteste = {
  tamanhoLoop: 100,
  bancaInicial: 150,
  alvo: 300,
  stop: 0,
  lances: [
    {
      indice: 1,
      valor: 5,
      alocacao: {
        cor: Cor.PRETO,
      },
      valorNovoLance: (jogadasAnteriores) => {
        if (jogadasAnteriores.length === 0) {
          return 1;
        } else {
          const jogadaAnterior =
            jogadasAnteriores[jogadasAnteriores.length - 1];
          const valorNormalLance = 1;
          const valorLanceAnterior = jogadaAnterior.valorLance;
          if (jogadaAnterior.resultadoPositivo) {
            return valorNormalLance;
          } else {
            return valorLanceAnterior + 5;
          }
        }
      },
    },
    {
      indice: 2,
      valor: 5,
      alocacao: {
        tipo: Tipo.IMPAR,
      },
      valorNovoLance: (jogadasAnteriores) => {
        if (jogadasAnteriores.length === 0) {
          return 1;
        } else {
          const jogadaAnterior =
            jogadasAnteriores[jogadasAnteriores.length - 1];
          const valorNormalLance = 1;
          const valorLanceAnterior = jogadaAnterior.valorLance;
          if (jogadaAnterior.resultadoPositivo) {
            return valorNormalLance;
          } else {
            return valorLanceAnterior + 5;
          }
        }
      },
    },
  ],
};
const backTeste = new Backteste(configuracoesBackteste);

backTeste.execute();
