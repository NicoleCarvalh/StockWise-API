import { Request, Response } from "express";
import { Router } from 'express'

const TransactionRouter = Router()

function getTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

TransactionRouter.get("/", getTransaction)
TransactionRouter.put("/", putTransaction)
TransactionRouter.post("/", postTransaction)
TransactionRouter.delete("/", deleteTransaction)

export { TransactionRouter };
