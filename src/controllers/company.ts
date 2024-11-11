import { Company } from "@prisma/client";
import { Request, Response } from "express";
import { Router } from "express";
import { CompanyService } from "../services/company.ts";
import { CompanyObjectValidator } from "../validations/Company.ts";

const CompanyRouter = Router();

function getCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

async function postCompany(request: Request, response: Response) {
  const company: Company = request.body
  
  const validations = CompanyObjectValidator.safeParse(company)
  if(!validations.success) {
    response.json(...validations.error.issues)
    return
  }

  response.json(await CompanyService.create(company))
}

function deleteCompany(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

CompanyRouter.get("/", getCompany);
CompanyRouter.put("/", putCompany);
CompanyRouter.post("/", postCompany);
CompanyRouter.delete("/", deleteCompany);

export { CompanyRouter };
