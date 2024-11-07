import { Request, Response } from "express";
import { Router } from "express";

const VirtualStockRouter = Router();

function getVirtualStock(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putVirtualStock(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postVirtualStock(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteVirtualStock(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

VirtualStockRouter.get("/", getVirtualStock);
VirtualStockRouter.put("/", putVirtualStock);
VirtualStockRouter.post("/", postVirtualStock);
VirtualStockRouter.delete("/", deleteVirtualStock);

export { VirtualStockRouter };
