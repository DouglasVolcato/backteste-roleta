import { NumeroEntity } from "../../domain/entities";
import {
  ConfiguracaoBackteste,
  ResultadoJogada,
  ResultadosBackteste,
} from "../../domain/protocols";
import { Random, Engine, MersenneTwister19937, integer } from "random-js";

export class Backteste {
  private readonly configuracoes: ConfiguracaoBackteste;
  private resultados: ResultadoJogada[];
  private numeroVitorias: number;
  private numeroDerrotas: number;

  public constructor(configuracoes: ConfiguracaoBackteste) {
    this.configuracoes = configuracoes;
    this.resultados = [];
    this.numeroVitorias = 0;
    this.numeroDerrotas = 0;
  }

  public execute(): void {
    let resultadosAtuais = [];
    let lucroAtual = 0;

    dias: for (let loop = 1; loop <= this.configuracoes.tamanhoLoop; loop++) {
      let i = 0;
      while (true) {
        i++;
        const numeroAleatorio = new NumeroEntity(this.gerarNumeroAleatorio());

        for (const lance of this.configuracoes.lances) {
          let valorLance: number =
            i === 1
              ? lance.valor
              : lance.valorNovoLance(
                  resultadosAtuais.filter(
                    (resultado) => resultado.lance.indice === lance.indice
                  )
                );

          if (valorLance > this.configuracoes.bancaInicial - lucroAtual) {
            valorLance = this.configuracoes.bancaInicial;
          }

          if (lance.alocacao.coluna) {
            if (lance.alocacao.coluna === numeroAleatorio.coluna) {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: valorLance * 2,
                resultadoPositivo: true,
              });
              lucroAtual += valorLance * 2;
            } else {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: -valorLance,
                resultadoPositivo: false,
              });
              lucroAtual -= valorLance;
            }
          }

          if (lance.alocacao.cor) {
            if (lance.alocacao.cor === numeroAleatorio.cor) {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: valorLance,
                resultadoPositivo: true,
              });
              lucroAtual += valorLance;
            } else {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: -valorLance,
                resultadoPositivo: false,
              });
              lucroAtual -= valorLance;
            }
          }

          if (lance.alocacao.tipo) {
            if (lance.alocacao.tipo === numeroAleatorio.tipo) {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: valorLance,
                resultadoPositivo: true,
              });
              lucroAtual += valorLance;
            } else {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: -valorLance,
                resultadoPositivo: false,
              });
              lucroAtual -= valorLance;
            }
          }

          if (lance.alocacao.duzia) {
            if (lance.alocacao.duzia === numeroAleatorio.duzia) {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: valorLance * 2,
                resultadoPositivo: true,
              });
              lucroAtual += valorLance * 2;
            } else {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: -valorLance,
                resultadoPositivo: false,
              });
              lucroAtual -= valorLance;
            }
          }

          if (lance.alocacao.tamanho) {
            if (lance.alocacao.tamanho === numeroAleatorio.tamanho) {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: valorLance,
                resultadoPositivo: true,
              });
              lucroAtual += valorLance;
            } else {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: -valorLance,
                resultadoPositivo: false,
              });
              lucroAtual -= valorLance;
            }
          }

          if (lance.alocacao.numero) {
            if (lance.alocacao.numero === numeroAleatorio.numero) {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: valorLance * 35,
                resultadoPositivo: true,
              });
              lucroAtual += valorLance * 35;
            } else {
              resultadosAtuais.push({
                lance: lance,
                valorLance: valorLance,
                valorLucro: -valorLance,
                resultadoPositivo: false,
              });
              lucroAtual -= valorLance;
            }
          }
        }

        if (
          Number(this.configuracoes.bancaInicial + lucroAtual) >=
          Number(this.configuracoes.alvo)
        ) {
          lucroAtual = 0;
          this.numeroVitorias++;
          this.resultados = this.resultados.concat(resultadosAtuais);
          continue dias;
        } else if (
          Number(this.configuracoes.bancaInicial + lucroAtual) <=
          Number(this.configuracoes.stop)
        ) {
          lucroAtual = 0;
          this.numeroDerrotas++;
          this.resultados = this.resultados.concat(resultadosAtuais);
          continue dias;
        }

        if (i === 50 && lucroAtual > 0) {
          lucroAtual = 0;
          this.numeroVitorias++;
          this.resultados = this.resultados.concat(resultadosAtuais);
          continue dias;
        } else if (i === 50 && lucroAtual <= 0) {
          lucroAtual = 0;
          this.numeroDerrotas++;
          this.resultados = this.resultados.concat(resultadosAtuais);
          continue dias;
        }
      }
    }

    const ganhos = this.numeroVitorias;
    const perdas = this.numeroDerrotas;
    const percentualAcertoDias = (ganhos * 100) / (ganhos + perdas);

    const ganhosLances = this.resultados.filter(
      (resultado) => resultado.resultadoPositivo
    ).length;
    const percentualAcertoLances =
      (ganhosLances * 100) / this.resultados.length;

      const resultados: ResultadosBackteste = {
        ganhos,
        perdas,
        percentualAcertoDias,
        percentualAcertoLances,
        lucroTotal: this.resultados.reduce((num, resultado) => num + resultado.valorLucro, 0)
      };
      

    console.log(resultados);
  }

  private gerarNumeroAleatorio(): number {
    const engine = MersenneTwister19937.autoSeed();
    const distribution = integer(0, 99);
    return distribution(engine);
  }
}
