import express from "express";
import { json } from "express";
import { Request, Response } from "express";
import { CompanyRouter } from "./routes/company.ts";
import { EmployeeRouter } from "./routes/employee.ts";
import { NotificationRouter } from "./routes/notification.ts";
import { ProductRouter } from "./routes/product.ts";
import { ReportRouter } from "./routes/report.ts";
import { TransactionRouter } from "./routes/transaction.ts";
import { VirtualStockRouter } from "./routes/virtualStock.ts";

// import { router } from "./router.js";

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

server.listen(3333, () => {
  console.log("tô aqui. tô vivo.");
});
