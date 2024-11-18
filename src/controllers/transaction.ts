import { Request, Response } from "express";
import { Router } from 'express'
import { TransactionService } from "../services/transaction.ts";

const TransactionRouter = Router()

async function getTransaction(request: Request, response: Response) {
  response.json(await TransactionService.getAll(response?.locals?.companyId));
}

function putTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

async function postTransaction(request: Request, response: Response) {
  const transaction = request.body
  const companyId = response.locals.companyId
  console.log("Aqui")
  console.log(transaction)
  response.json(await TransactionService.create({...transaction, companyId}));
}

function deleteTransaction(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

TransactionRouter.get("/", getTransaction)
TransactionRouter.put("/", putTransaction)
TransactionRouter.post("/", postTransaction)
TransactionRouter.delete("/", deleteTransaction)

export { TransactionRouter };
