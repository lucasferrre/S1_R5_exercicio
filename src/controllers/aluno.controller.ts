import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

export class AlunoController {
    constructor(private _service = new AlunoService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const alunos = await this._service.selecionarTodos();
            const idAluno = req.query.id;
            const nome = req.query.nome;
            
            if (idAluno) {
                const result = await this._service.selectId(Number(idAluno));
                return res.status(200).json({ alunos: result });
            }

            if (nome) {
                const resultNome = await this._service.selectAluno(String(nome));
                return res.status(200).json({ alunos: resultNome });
            }

            res.status(200).json({ alunos })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }


    selecionaAlunoOrdem = async (req: Request, res: Response) => {
        try {
            const alunos = await this._service.selectAlunoOrdem();
            res.status(200).json({ alunos })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }



    criarAluno = async (req: Request, res: Response) => {
        try {
            const {nome, email, matricula, curso, mediaFinal} = req.body;
            const novo = await this._service.criarAluno(nome, email, matricula, curso, mediaFinal)
            res.status(201).json({novo})
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }
    editarAluno = async (req: Request, res: Response) => {
        try {
            const {nome, email, matricula, curso, mediaFinal} = req.body;
            const idAluno = Number(req.query.idAluno);
            const alterado = await this._service.editarAluno(idAluno, nome, email, matricula, curso, mediaFinal);
            res.status(200).json({alterado})
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }

        deletarAluno = async (req: Request, res: Response) => {
        try {
            const idAluno = Number(req.params.idAluno);
            const deletado = await this._service.deletarAluno(idAluno);
            res.status(200).json({deletado})
        } catch (error: unknown) {
            console.error(error);
             if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    }
}
