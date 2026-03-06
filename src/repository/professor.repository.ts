import { db } from "../database/connection.database";
import { Professor } from "../models/professor.model";

export class ProfessorRepository {
    async selectTodos() {
        const [rows] = await db.execute(
            'SELECT * FROM professores;'
        );
        return rows;
    }
    async selectId(idProfessor: number) {
        const sql = 'SELECT * FROM professores WHERE idProfessor = ?;';
        const values = [idProfessor];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async selectProfessor(nome: string) {
        const sql = 'SELECT * FROM professores WHERE nome = ?;';
        const values = [nome];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async selectProfessorOrdem() {
        const sql = 'SELECT * FROM professores ORDER BY nome ASC;';
        const [rows] = await db.execute(sql);
        return rows;
    }

    async selectEmail(email: string) {
        const sql = 'SELECT * FROM professores WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows;

    }

    async insertProfessor(Professor: Professor) {
        const sql = 'INSERT INTO professores (nome, email, Disciplina, CargaHoraria) VALUES (?,?,?,?);';
        const values = [Professor.Nome, Professor.Email,Professor.Disciplina, Professor.CargaHoraria];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async updateProfessor(idProfessor:number, Professor: Professor) {
        const sql = 'UPDATE professores SET nome =?, email =?, disciplina=?, cargaHoraria=? WHERE idProfessor = ?;';
        const values = [ Professor.Nome, Professor.Email,Professor.Disciplina, Professor.CargaHoraria, idProfessor];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

    async deleteProfessor(idProfessor: number) {
        const sql = 'DELETE FROM professores WHERE idProfessor = ?;';
        const values = [idProfessor];
        const [rows] = await db.execute(sql, values);
        return rows;
    }

}