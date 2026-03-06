import { ProfessorRepository } from "../repository/professor.repository"
import { Professor } from "../models/professor.model"

export class ProfessorService {
    constructor(private _repository = new ProfessorRepository()) { }

    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    async selectId(idProfessor: number) {
        return await this._repository.selectId(idProfessor);
    }

    async selectProfessor(nome: string) {
        return await this._repository.selectProfessor(nome);
    }

    async selectProfessorOrdem() {
        return await this._repository.selectProfessorOrdem();
    }

    async criarProfessor(nome: string, email: string, Disciplina: string, CargaHoraria: number) {

        const emailExistente = await this._repository.selectEmail(email);

           if ((emailExistente as any[]).length > 0) {
            throw new Error("Já existe um Professor com esse email");
        }

        const professor = Professor.inserir(nome, email, Disciplina, CargaHoraria);
        return await this._repository.insertProfessor(professor);
    }

    async editarProfessor(idProfessor: number,nome: string, email: string,  Disciplina: string, CargaHoraria: number) {
        const professor = Professor.alterar(nome, email, Disciplina, CargaHoraria, idProfessor);
        return await this._repository.updateProfessor(idProfessor, professor)
    }

    async deletarProfessor(idProfessor: number) {
        const Professor = await this._repository.selectId(idProfessor);

        if ((Professor as any[]).length === 0) {
            throw new Error("Professor não encontrado");
        }

        await this._repository.deleteProfessor(idProfessor);

        const verificar = await this._repository.selectId(idProfessor);

        if ((verificar as any[]).length > 0) {
            throw new Error("Erro ao deletar aluno");
        }

        return await this._repository.deleteProfessor(idProfessor);
    }
}


