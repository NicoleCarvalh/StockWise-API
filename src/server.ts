import express from "express";
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
import { routerGuardHandler } from "./_auth/routerGuard.ts";
import cors from "cors"
import { METHODS } from "http";

const server = express();
// const whitelist = ['http://localhost:5173', 'http://192.168.18.15:5173']
// const corsOptions = {
//   origin: ["http://localhost:5173", "http://192.168.0.11:5173"]
// }

// const whitelist = ['http://192.168.18.15:5173', 'http://localhost:5173']
const whitelist = ['http://192.168.0.11:5173', 'http://localhost:5173']
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

server.use(cors(corsOptions))

server.use(json())

server.use(routerGuardHandler)

server.get("/", (request: Request, response: Response) => {
  response.json("Hello, api with express").status(200);
});

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
