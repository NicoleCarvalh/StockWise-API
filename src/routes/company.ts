import { Request, Response } from "express";
import { Router } from "express";

const CompanyRouter = Router();

function getCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

CompanyRouter.get("/", getCompany);
CompanyRouter.put("/", putCompany);
CompanyRouter.post("/", postCompany);
CompanyRouter.delete("/", deleteCompany);

export { CompanyRouter };
