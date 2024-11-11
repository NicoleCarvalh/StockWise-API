import { Request, Response } from "express";
import { Router } from 'express'

const ProductRouter = Router()

function getProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ProductRouter.get("/", getProduct)
ProductRouter.put("/", putProduct)
ProductRouter.post("/", postProduct)
ProductRouter.delete("/", deleteProduct)

export { ProductRouter };
