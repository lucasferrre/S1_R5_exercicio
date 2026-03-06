import { db } from "../database/connection.database";
import { Aluno } from "../models/aluno.model";

export class AlunoRepository {
    async selectTodos() {
        const [rows] = await db.execute(
            'SELECT * FROM alunos;'
        );
        return rows;
    }
    async selectId(idAluno: number) {
        const sql = 'SELECT * FROM alunos WHERE idAluno = ?;';
        const values = [idAluno];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async selectAluno(nome: string) {
        const sql = 'SELECT * FROM alunos WHERE nome = ?;';
        const values = [nome];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async selectAlunoOrdem() {
        const sql = 'SELECT * FROM alunos ORDER BY nome ASC;';
        const [rows] = await db.execute(sql);
        return rows;
    }

    async selectMatricula(matricula: string) {
        const sql = 'SELECT * FROM alunos WHERE matricula = ?';
        const [rows] = await db.execute(sql, [matricula]);
        return rows;

    }

    async insertAluno(aluno: Aluno) {
        const sql = 'INSERT INTO alunos (nome, email, matricula, curso, mediaFinal) VALUES (?,?,?,?,?);';
        const values = [aluno.Nome, aluno.Email, aluno.Matricula, aluno.Curso, aluno.MediaFinal];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async updateAluno(idProduto:number, aluno: Aluno) {
        const sql = 'UPDATE alunos SET nome =?, email =?,  matricula=?, curso=?, mediaFinal=? WHERE idAluno = ?;';
        const values = [aluno.Nome, aluno.Email, aluno.Matricula, aluno.Curso, aluno.MediaFinal, idProduto];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async deleteAluno(idAluno: number) {
        const sql = 'DELETE FROM alunos WHERE idAluno = ?;';
        const values = [idAluno];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

}