import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {
    console.error("ERRO GLOBAL:", error); 

    if (error.message.includes("não encontrado")) {
        return res.status(404).json({
        status: "error",
        message: error.message 
        });
    }

    if (error.message.includes("inválido") || 
        error.message.includes("vazio") ||
        error.message.includes("em uso")) {
        return res.status(400).json({
        status: "error",
        message: error.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Erro interno inesperado no servidor."
    });
};