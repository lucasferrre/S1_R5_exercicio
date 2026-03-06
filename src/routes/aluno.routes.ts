import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

const alunoController = new AlunoController();
const alunoRoutes = Router();

alunoRoutes.get('/alunos', alunoController.selecionaTodos);
alunoRoutes.get('/alunos/ordem', alunoController.selecionaAlunoOrdem);
alunoRoutes.post('/alunos', alunoController.criarAluno);
alunoRoutes.patch('/alunos', alunoController.editarAluno);
alunoRoutes.delete('/alunos/:idAluno', alunoController.deletarAluno);

export default alunoRoutes;