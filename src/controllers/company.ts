import { Company } from "@prisma/client";
import { Request, Response } from "express";
import { Router } from "express";
import { CompanyService } from "../services/company.ts";
import { CompanyUpdateDataValidator, CompanyObjectValidator, CompanyCredentialsValidator, CompanyFormDataValidator, CompanyFormDataType } from "../_validations/Company.ts";
import { signToken } from "../_auth/jwt.ts";
import { formFileMapper } from "../_utils/multer.ts";

const CompanyRouter = Router();

async function getCompanies(request: Request, response: Response) { 
  response.status(200).json(await CompanyService.getAll());
}

// Unprotected route
async function getCompanyByCredentials(request: Request, response: Response) {
  const { email, password } = request.body

  const validations = CompanyCredentialsValidator.safeParse({email, password})
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

// Unprotected route
async function postCompany(request: Request, response: Response) {
  const companyFormData: CompanyFormDataType = {...request.body, image: request.file}

  const validations = CompanyFormDataValidator.safeParse(companyFormData)
  if(!validations.success) {
    response.status(400).json(...validations.error.issues)
    return
  }

  response.status(200).json(await CompanyService.create(companyFormData))
}
 
async function deleteCompany(request: Request, response: Response) {
  const companyId = response.locals.companyId
  
  response.status(200).json(await CompanyService.delete(companyId));
}

CompanyRouter.get("/", getCompanies);
CompanyRouter.post("/validate", getCompanyByCredentials);
CompanyRouter.put("/", putCompany);
CompanyRouter.post("/", formFileMapper.single("image") ,postCompany);
CompanyRouter.delete("/", deleteCompany);

export { CompanyRouter };
