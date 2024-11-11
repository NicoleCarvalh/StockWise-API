import { Request, Response } from "express";
import { Router } from "express";

const EmployeeRouter = Router();

function getEmployee(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putEmployee(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postEmployee(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteEmployee(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

EmployeeRouter.get("/", getEmployee);
EmployeeRouter.put("/", putEmployee);
EmployeeRouter.post("/", postEmployee);
EmployeeRouter.delete("/", deleteEmployee);

export { EmployeeRouter };
