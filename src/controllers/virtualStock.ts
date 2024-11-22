import { Request, Response } from "express";
import { Router } from "express";
import { VirtualStockService } from "../services/virtualStock.js";
import { VirtualStockObjectType, VirtualStockObjectValidator } from "../_validations/VirtualStock.js";
import { Console } from "console";

const VirtualStockRouter = Router();

async function getVirtualStock(request: Request, response: Response) {
  const companyId = response.locals.companyId

  response.json(await VirtualStockService.getAll(companyId));
}

async function putVirtualStock(request: Request, response: Response) {
  const receivedData = request.body
  // const productFormData: VirtualStockObjectType = {
  //   ...receivedData,
  //   companyId,
  //   products: receivedData?.products ?? [],
  //   productsIds: receivedData?.productsIds ?? [],
  // }

  // const validations = VirtualStockObjectValidator.safeParse(productFormData)

  // console.log(validations)

  // if(!validations.success) {
  //   response.status(400).json(...validations.error.issues)
  //   return
  // }

  console.log("Recebido:")
  console.log(receivedData)

  response.json(await VirtualStockService.update(receivedData?.id ?? "", receivedData));
}

async function postVirtualStock(request: Request, response: Response) {
  const stock = request.body
  const companyId = response.locals.companyId

  response.json(await VirtualStockService.create({...stock, companyId}));
}

async function deleteVirtualStock(request: Request, response: Response) {
  const id = request.params.id
  response.json(await VirtualStockService.delete(id));
}

VirtualStockRouter.get("/", getVirtualStock);
VirtualStockRouter.put("/", putVirtualStock);
VirtualStockRouter.post("/", postVirtualStock);
VirtualStockRouter.delete("/:id", deleteVirtualStock);

export { VirtualStockRouter };
