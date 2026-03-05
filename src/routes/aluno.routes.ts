import { Router } from "express";

const alunoController = new alunoController();
const alunoRoutes = Router();

alunoRoutes.get('/alunos', alunoController.selecionaTodos);
alunoRoutes.get('/alunos/ordem', alunoController.selecionaAlunoOrdem);
alunoRoutes.post('/alunos', alunoController.criarAluno);
alunoRoutes.patch('/alunos', alunoController.editarAluno);
alunoRoutes.delete('/alunos', alunoController.deletarAluno);

export default alunoRoutes;