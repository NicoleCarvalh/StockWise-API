import { Request, Response } from "express";
import { Router } from 'express'
import { ProductFormDataType, ProductFormDataValidator } from "../_validations/Product.ts";
import { formFileMapper } from "../_utils/multer.ts";
import { ProductService } from "../services/product.ts";

const ProductRouter = Router()

async function getProduct(request: Request, response: Response) {
  response.json(await ProductService.getAll());
}

async function putProduct(request: Request, response: Response) {
  console.log(request.body)
  const id = request.body?.id
  const productNewData = request.body

  const productFormData = {
    ...productNewData, 
    purchasePrice: Number.parseFloat(productNewData.purchasePrice),
    salePrice: Number.parseFloat(productNewData.salePrice),
    quantityInStock: Number.parseInt(productNewData.quantityInStock),
    technicalDetails: { 
      width: JSON.parse(productNewData?.technicalDetails)?.width ?? 0, 
      height: JSON.parse(productNewData?.technicalDetails)?.height ?? 0, 
      length: JSON.parse(productNewData?.technicalDetails)?.length ?? 0,
      weight: JSON.parse(productNewData?.technicalDetails)?.weight ?? 0 
    },
    image: request.file
  }
  response.json(await ProductService.update(id, productFormData));
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
      weight: JSON.parse(receivedData?.technicalDetails)?.weight ?? 0 
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

async function deleteProduct(request: Request, response: Response) {
  const id = request.params.id
  console.log("AQUI")
  console.log(id)
  response.json(await ProductService.delete(id));
}

ProductRouter.get("/", getProduct)
ProductRouter.put("/", formFileMapper.single('image'), putProduct)
ProductRouter.post("/", formFileMapper.single('image'), postProduct)
ProductRouter.delete("/:id", deleteProduct)

export { ProductRouter };
