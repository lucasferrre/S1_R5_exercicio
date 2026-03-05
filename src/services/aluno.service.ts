import { AlunoRepository } from"../repository/aluno.repository"
import { Aluno } from "../models/aluno.model"

export class AlunoService {
    constructor (private _repository = new AlunoRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

       async selectId(idAluno:number) {
        return await this._repository.selectId(idAluno);
    }

    async selectAluno(nome:string) {
        return await this._repository.selectAluno(nome);
    }

    async selectAlunoOrdem() {
        return await this._repository.selectAlunoOrdem();
    }

    async criarAluno (nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const aluno = Aluno.inserir(nome, email, matricula, curso, mediaFinal);
        return await this._repository.insertAluno(aluno);
    }

    async editarAluno (nome: string, email: string, matricula: string, curso: string, mediaFinal: number, idAluno: number) {
        const aluno = Aluno.alterar(nome, email, matricula, curso, mediaFinal, idAluno);
        return await this._repository.updateAluno(aluno)
    }

    async deletarAluno (idAluno:number) {
        return await this._repository.deleteAluno(idAluno);
    }
}


