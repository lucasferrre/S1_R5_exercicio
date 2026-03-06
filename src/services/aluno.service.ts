import { AlunoRepository } from "../repository/aluno.repository"
import { Aluno } from "../models/aluno.model"

export class AlunoService {
    constructor(private _repository = new AlunoRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selectId(idAluno: number) {
        return await this._repository.selectId(idAluno);
    }

    async selectAluno(nome: string) {
        return await this._repository.selectAluno(nome);
    }

    async selectAlunoOrdem() {
        return await this._repository.selectAlunoOrdem();
    }

    async criarAluno(nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const matriculaExistente = await this._repository.selectMatricula(matricula);

        if ((matriculaExistente as any[]).length > 0) {
            throw new Error("Já existe um aluno com essa matrícula");
        }
        const aluno = Aluno.inserir(nome, email, matricula, curso, mediaFinal);
        return await this._repository.insertAluno(aluno);
    }

    async editarAluno(idAluno: number, nome: string, email: string, matricula: string, curso: string, mediaFinal: number) {
        const aluno = Aluno.alterar(nome, email, matricula, curso, mediaFinal, idAluno);
        return await this._repository.updateAluno(idAluno, aluno)
    }

    async deletarAluno(idAluno: number) {
        const aluno = await this._repository.selectId(idAluno);

        if ((aluno as any[]).length === 0) {
            throw new Error("Aluno não encontrado");
        }

        await this._repository.deleteAluno(idAluno);

        const verificar = await this._repository.selectId(idAluno);

        if ((verificar as any[]).length > 0) {
            throw new Error("Erro ao deletar aluno");
        }

        return await this._repository.deleteAluno(idAluno);
    }
}


