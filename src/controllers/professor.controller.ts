import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export class ProfessorController {
    constructor(private _service = new ProfessorService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const professores = await this._service.selecionarTodos();
            const idProfessor = req.query.id;
            const nome = req.query.nome;
            
            if (idProfessor) {
                const result = await this._service.selectId(Number(idProfessor));
                return res.status(200).json({ professores: result });
            }

            if (nome) {
                const resultNome = await this._service.selectProfessor(String(nome));
                return res.status(200).json({ professores: resultNome });
            }

            res.status(200).json({ professores })
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


    selecionaProfessorOrdem = async (req: Request, res: Response) => {
        try {
            const professores = await this._service.selectProfessorOrdem();
            res.status(200).json({ professores })
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



    criarProfessor = async (req: Request, res: Response) => {
        try {
            const {nome, email, disciplina, cargaHoraria} = req.body;
            const novo = await this._service.criarProfessor(nome, email, disciplina, cargaHoraria)
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
    editarProfessor = async (req: Request, res: Response) => {
        try {
            const {nome, email, disciplina, cargaHoraria} = req.body;
            const idProfessor = Number(req.query.idProfessor);
            const alterado = await this._service.editarProfessor(idProfessor, nome, email, disciplina, cargaHoraria);
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

        deletarProfessor = async (req: Request, res: Response) => {
        try {
            const idProfessor = Number(req.params.idProfessor);
            const deletado = await this._service.deletarProfessor(idProfessor);
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
