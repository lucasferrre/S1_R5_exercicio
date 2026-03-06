export interface Ipessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements Ipessoa {
    protected nome: string;
    protected email: string;

    constructor(nome: string, email: string) {
        this.nome = nome;
        this.email = email;
    }
    abstract mostrarDados(): string;
}

export class Professor extends Pessoa {
    private _idProfessor?: number;
    private _disciplina: string;
    private _cargaHoraria: number;        
    private _dataCad?: Date;

    constructor(
        nome: string,
        email: string,
        _disciplina: string,
        _cargaHoraria: number,
        _idProfessor?: number,
        _dataCad?: Date
    ) {
        super(nome, email);
        this._disciplina = _disciplina;
        this._cargaHoraria = _cargaHoraria;
        this._idProfessor = _idProfessor;
        this._dataCad = _dataCad;
    }

    mostrarDados(): string {
        return `Nome: ${this.nome} | Email: ${this.email} | Disciplina: ${this._disciplina}`;
    }


    public get IdProfessor(): number | undefined {
        return this._idProfessor;
    }

    public get Nome(): string {
        return this.nome;
    }

    public get Email(): string {
        return this.email;
    }

    public get Disciplina(): string {
        return this._disciplina;
    }

    public get CargaHoraria(): number {
        return this._cargaHoraria;
    }
    public get Data(): Date | undefined {
        return this._dataCad;
    }

    public set NomeProfessor(value: string) {
        this._validarNome(value);
        this.nome = value;
    }

    public set Id(value: number) {
        this._validarId(value);
        this._idProfessor = value;
    }


    public static inserir(nome: string, email: string, Disciplina: string, CargaHoraria: number): Professor {
        return new Professor(nome, email, Disciplina, CargaHoraria);
    }

    public static alterar(nome: string, email: string,  Disciplina: string, CargaHoraria: number, idProfessor: number): Professor {
        return new Professor(nome, email, Disciplina, CargaHoraria, idProfessor);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length <= 2) {
            throw new Error('Nome do Professor deve ter pelo menos 2 caracteres');
        }
        if (value.trim().length > 150) {
            throw new Error('Nome do Professor deve ter no máximo 150 caracteres');
        }
    }

    private _validarId(value: number): void {
        if (!value || value <= 0 || !Number.isInteger(value)) {
            throw new Error('Id do Professor deve ser um número positivo');
        }
    }

}
