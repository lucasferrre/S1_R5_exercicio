import { Router } from "express";
import { ProfessorController } from "../controllers/professor.controller";

const professorController = new ProfessorController();
const professorRoutes = Router();

professorRoutes.get('/professores', professorController.selecionaTodos);
professorRoutes.get('/professores/ordem', professorController.selecionaProfessorOrdem);
professorRoutes.post('/professores', professorController.criarProfessor);
professorRoutes.patch('/professores', professorController.editarProfessor);
professorRoutes.delete('/professores/:idProfessor', professorController.deletarProfessor);

export default professorRoutes;