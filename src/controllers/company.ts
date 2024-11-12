import { Company } from "@prisma/client";
import { Request, Response } from "express";
import { Router } from "express";
import { CompanyService } from "../services/company.ts";
import { CompanyUpdateDataValidator, CompanyObjectValidator } from "../_validations/Company.ts";
import { signToken } from "../_auth/jwt.ts";

const CompanyRouter = Router();

async function getCompanies(request: Request, response: Response) { 
  response.status(200).json(await CompanyService.getAll());
}

// Unprotected route
async function getCompanyByCredentials(request: Request, response: Response) {
  const { email, password } = request.body

  const validations = CompanyUpdateDataValidator.safeParse({email, password})
  if(!validations.success) {
    response.status(400).json(...validations.error.issues)
    return
  }

  const foundCompany = await CompanyService.getByEmailAndPassword(email, password)
  
  if(!foundCompany) {
    response.status(404).json({
      companyExists: false
    })

    return
  }

  response.status(200).json({
    companyExists: true,
    token: signToken({id: foundCompany.id}),
    company: foundCompany
  })
}

function putCompany(request: Request, response: Response) {
  const companyId = response.locals.companyId
  const companyNewData = request.body

  const validations = CompanyUpdateDataValidator.safeParse(companyNewData)
  if(!validations.success) {
    response.status(400).json(...validations.error.issues)
    return
  }
  
  response.status(200).json(CompanyService.update(companyId, companyNewData));
}

async function postCompany(request: Request, response: Response) {
  const company: Company = request.body
  
  const validations = CompanyObjectValidator.safeParse(company)
  if(!validations.success) {
    response.status(400).json(...validations.error.issues)
    return
  }

  response.status(200).json(await CompanyService.create(company))
}
 
async function deleteCompany(request: Request, response: Response) {
  const companyId = response.locals.companyId
  
  response.status(200).json(await CompanyService.delete(companyId));
}

CompanyRouter.get("/", getCompanies);
CompanyRouter.post("/validate", getCompanyByCredentials);
CompanyRouter.put("/", putCompany);
CompanyRouter.post("/", postCompany);
CompanyRouter.delete("/", deleteCompany);

export { CompanyRouter };
