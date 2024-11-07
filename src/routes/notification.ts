import { Request, Response } from "express";
import { Router } from "express";

const NotificationRouter = Router();

function getNotification(request: Request, response: Response) {
  response.json();
}

function putNotification(request: Request, response: Response) {
  response.json("Rota de teste com o método PUT");
}

function postNotification(request: Request, response: Response) {


  const { n1:value1, n2:value2 } = request.body

  const obj = {result: (value1 + value2)}

  response.json(obj);
}

function deleteNotification(request: Request, response: Response) {
  response.json("Rota de teste com o método DELETE");
}

NotificationRouter.get("/", getNotification);
NotificationRouter.put("/", putNotification);
NotificationRouter.post("/", postNotification);
NotificationRouter.delete("/", deleteNotification);

export { NotificationRouter };
