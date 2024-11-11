import express, { NextFunction } from "express";
import { json } from "express";
import { Request, Response } from "express";
import { CompanyRouter } from "./controllers/company.ts";
import { EmployeeRouter } from "./controllers/employee.ts";
import { NotificationRouter } from "./controllers/notification.ts";
import { ProductRouter } from "./controllers/product.ts";
import { ReportRouter } from "./controllers/report.ts";
import { TransactionRouter } from "./controllers/transaction.ts";
import { VirtualStockRouter } from "./controllers/virtualStock.ts";
import "dotenv/config";
import { Prisma } from "@prisma/client";

const server = express();
server.use(json())

server.get("/", (request: Request, response: Response) => {
  response.json("Hello, api with express").status(200);
});

// server.use(router);
server.use("/notification", NotificationRouter);
server.use("/company", CompanyRouter);
server.use("/employee", EmployeeRouter);
server.use("/notification", NotificationRouter);
server.use("/product", ProductRouter);
server.use("/report", ReportRouter);
server.use("/transaction", TransactionRouter);
server.use("/virtualStock", VirtualStockRouter);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.SERVER_PORT} \nAccess the server here: http://localhost:${process.env.SERVER_PORT}`)
});
