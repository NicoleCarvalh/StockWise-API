import { Request, Response } from "express";
import { Router } from 'express'
import { ProductFormDataType, ProductFormDataValidator } from "../_validations/Product.ts";
import { formFileMapper } from "../_utils/multer.ts";

const ProductRouter = Router()

function getProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postProduct(request: Request, response: Response) {
  const companyId = response.locals.companyId

  console.log(request.body)
  console.log(request.files)

  // const productFormData: ProductFormDataType = {...request.body, image: request.files['image'] ?? null, qrcode: request?.files[0] ?? null}

  // const validations = ProductFormDataValidator.safeParse(productFormData)
  // if(!validations.success) {
  //   response.status(400).json(...validations.error.issues)
  //   return
  // }

  response.json("Rota de teste com o método POST");
}

function deleteProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ProductRouter.get("/", getProduct)
ProductRouter.put("/", putProduct)
ProductRouter.post("/", formFileMapper.fields([{name: "image"}, {name: "qrcode"}]), postProduct)
ProductRouter.delete("/", deleteProduct)

export { ProductRouter };
