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
  const receivedData = request.body
  const productFormData: ProductFormDataType = {
    ...receivedData, 
    purchasePrice: Number.parseFloat(receivedData.purchasePrice),
    salePrice: Number.parseFloat(receivedData.salePrice),
    quantityInStock: Number.parseInt(receivedData.quantityInStock),
    technicalDetails: JSON.parse(receivedData?.technicalDetails ?? { width: null, height: null, length: null, weigh: null })
  }

  console.log(productFormData)
  console.log(request.file)

  const validations = ProductFormDataValidator.safeParse(productFormData)
  if(!validations.success) {
    response.status(400).json(...validations.error.issues)
    return
  }


  response.json("Rota de teste com o método POST");
}

function deleteProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ProductRouter.get("/", getProduct)
ProductRouter.put("/", putProduct)
ProductRouter.post("/", formFileMapper.single('image'), postProduct)
ProductRouter.delete("/", deleteProduct)

export { ProductRouter };
