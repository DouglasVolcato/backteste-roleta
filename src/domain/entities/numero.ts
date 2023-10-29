import { Coluna, Cor, Duzia, Numero, Tamanho, Tipo } from "../protocols";

export class NumeroEntity implements Numero {
  public readonly numero: number;
  public readonly tipo: Tipo;
  public readonly cor: Cor;
  public readonly tamanho: Tamanho;
  public readonly duzia: Duzia;
  public readonly coluna: Coluna;

  public constructor(numero: number) {
    this.numero = numero;
    this.tipo = this.getTipo();
    this.cor = this.getCor();
    this.tamanho = this.getTamanho();
    this.duzia = this.getDuzia();
    this.coluna = this.getColuna();
  }

  private getTipo(): Tipo {
    return this.numero === 0 || this.numero % 2 === 0 ? Tipo.PAR : Tipo.IMPAR;
  }

  private getCor(): Cor {
    return this.numero === 0
      ? Cor.NENHUMA
      : (this.numero > 0 && this.numero <= 10) ||
        (this.numero > 18 && this.numero <= 28)
      ? this.numero % 2 === 0
        ? Cor.PRETO
        : Cor.VERMELHO
      : this.numero % 2 === 0
      ? Cor.VERMELHO
      : Cor.PRETO;
  }

  private getTamanho(): Tamanho {
    return this.numero === 0
      ? Tamanho.NENHUM
      : this.numero >= 1 && this.numero <= 18
      ? Tamanho.MENOR
      : Tamanho.MAIOR;
  }

  private getDuzia(): Duzia {
    if (this.numero >= 1 && this.numero <= 12) {
      return Duzia.PRIMEIRA;
    } else if (this.numero >= 13 && this.numero <= 24) {
      return Duzia.SEGUNDA;
    } else {
      return Duzia.TERCEIRA;
    }
  }

  private getColuna(): Coluna {
    return this.numero === 0
      ? Coluna.NENHUMA
      : this.numero % 3 === 1
      ? Coluna.PRIMEIRA
      : this.numero % 3 === 2
      ? Coluna.SEGUNDA
      : Coluna.TERCEIRA;
  }
}
