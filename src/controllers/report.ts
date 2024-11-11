import { Request, Response } from "express";
import { Router } from "express";

const ReportRouter = Router();

function getReport(request: Request, response: Response) {
  response.json("Rota de teste com o método GET");
}

function putReport(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postReport(request: Request, response: Response) {
  response.json("Rota de teste com o método POST");
}

function deleteReport(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

ReportRouter.get("/", getReport);
ReportRouter.put("/", putReport);
ReportRouter.post("/", postReport);
ReportRouter.delete("/", deleteReport);

export { ReportRouter };
