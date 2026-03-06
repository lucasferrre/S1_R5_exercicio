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

export class Aluno extends Pessoa {
    private _idAluno?: number;
    private _matricula: string;
    private _curso: string;
    private _mediaFinal: number;
    private _dataCad?: Date;

    constructor(
        nome: string,
        email: string,
        _matricula: string,
        _curso: string,
        _mediaFinal: number,
        _idAluno?: number,
        _dataCad?: Date
    ) {
        super(nome, email);
        this._matricula = _matricula;
        this._curso = _curso;
        this._mediaFinal = _mediaFinal;
        this._idAluno = _idAluno;
        this._dataCad = _dataCad;
    }

    mostrarDados(): string {
        return `
        idAluno: ${this._idAluno}    
        Nome: ${this.nome} 
        Email: ${this.email}
        matricula: ${this._matricula}
        Curso: ${this._curso}
        mediaFinal ${this._mediaFinal}`;
    }


    public get IdAluno(): number | undefined {
        return this._idAluno;
    }

    public get Nome(): string {
        return this.nome;
    }

    public get Email(): string {
        return this.email;
    }

    public get Matricula(): string {
        return this._matricula;
    }
    public get Curso(): string {
        return this._curso;
    }
    public get MediaFinal(): number {
        return this._mediaFinal;
    }
    public get Data(): Date | undefined {
        return this._dataCad;
    }

    public set NomeAluno(value: string) {
        this._validarNome(value);
        this.nome = value;
    }

    public set Id(value: number) {
        this._validarId(value);
        this._idAluno = value;
    }

    public set MediaFinal(value:number){
         this._validarMediaFinal(value);
        this._mediaFinal = value;
    }

      estaAprovado(): string {
        return this.MediaFinal >= 5 ? "Aprovado" : "Reprovado";
    }



    public static inserir(nome: string, email: string, matricula: string, curso: string, mediaFinal: number): Aluno {
        return new Aluno(nome, email, matricula, curso, mediaFinal);
    }

    public static alterar(nome: string, email: string, matricula: string, curso: string, mediaFinal: number, idAluno: number): Aluno {
        return new Aluno(nome, email, matricula, curso, mediaFinal, idAluno);
    }

    private _validarNome(value: string): void {
        if (!value || value.trim().length <= 2) {
            throw new Error('Nome do aluno deve ter pelo menos 2 caracteres');
        }
        if (value.trim().length > 150) {
            throw new Error('Nome do aluno deve ter no máximo 150 caracteres');
        }
    }

    private _validarId(value: number): void {
        if (!value || value <= 0 || !Number.isInteger(value)) {
            throw new Error('Id do aluno deve ser um número positivo');
        }
    }

     private _validarMediaFinal(value: number): void {
        if (value === undefined || value === null) {
        throw new Error("A média final é obrigatória");
        }

        if (typeof value !== "number" || isNaN(value)) {
            throw new Error("A média final deve ser um número válido");
        }
    }
}
