import { Request, Response } from "express";
import { Router } from "express";
import { CompanyService } from "../services/company.js";
import { CompanyUpdateDataValidator, CompanyCredentialsValidator, CompanyFormDataValidator, CompanyFormDataType } from "../_validations/Company.js";
import { signToken } from "../_auth/jwt.js";
import { formFileMapper } from "../_utils/multer.js";

const CompanyRouter = Router();

async function getCompanies(request: Request, response: Response) { 
  response.status(200).json(await CompanyService.getAll());
}

// Unprotected route
async function getCompanyByCredentials(request: Request, response: Response) {
  console.log("entrou")
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
  let companyNewData = request.body

  if(request?.file) {
    companyNewData["image"] = request.file

    const validations = CompanyFormDataValidator.safeParse(companyNewData)
    if(!validations.success) {
      response.status(400).json(...validations.error.issues)
      return
    }
    
    response.status(200).json(CompanyService.update(companyId, companyNewData));
  }

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
CompanyRouter.put("/", formFileMapper.single("image"), putCompany);
CompanyRouter.post("/", formFileMapper.single("image") ,postCompany);
CompanyRouter.delete("/", deleteCompany);

export { CompanyRouter };
