import { Request, Response } from "express";
import { Router } from 'express'
import { ProductFormDataType, ProductFormDataValidator } from "../_validations/Product.ts";
import { formFileMapper } from "../_utils/multer.ts";
import { ProductService } from "../services/product.ts";

const ProductRouter = Router()

function getProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

async function postProduct(request: Request, response: Response) {
  const companyId = response.locals.companyId
  const receivedData = request.body
  const productFormData: ProductFormDataType = {
    ...receivedData, 
    purchasePrice: Number.parseFloat(receivedData.purchasePrice),
    salePrice: Number.parseFloat(receivedData.salePrice),
    quantityInStock: Number.parseInt(receivedData.quantityInStock),
    technicalDetails: { 
      width: JSON.parse(receivedData?.technicalDetails)?.width ?? 0, 
      height: JSON.parse(receivedData?.technicalDetails)?.height ?? 0, 
      length: JSON.parse(receivedData?.technicalDetails)?.length ?? 0,
      weigh: JSON.parse(receivedData?.technicalDetails)?.weigh ?? 0 
    },
    image: request.file
  }

  const validations = ProductFormDataValidator.safeParse(productFormData)
  if(!validations.success) {
    response.status(400).json(...validations.error.issues)
    return
  }

  response.status(200).json(await ProductService.create(companyId, productFormData));
}

function deleteProduct(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ProductRouter.get("/", getProduct)
ProductRouter.put("/", putProduct)
ProductRouter.post("/", formFileMapper.single('image'), postProduct)
ProductRouter.delete("/", deleteProduct)

export { ProductRouter };
