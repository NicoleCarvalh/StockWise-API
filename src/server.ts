import express from "express";
import { json } from "express";
import { Request, Response } from "express";
import { CompanyRouter } from "./controllers/company.ts";
import { EmployeeRouter } from "./controllers/employee.ts";
import { ProductRouter } from "./controllers/product.ts";
import { ReportRouter } from "./controllers/report.ts";
import { TransactionRouter } from "./controllers/transaction.ts";
import { VirtualStockRouter } from "./controllers/virtualStock.ts";
import { routerGuardHandler } from "./_auth/routerGuard.ts";
import "dotenv/config";
import cors from "cors";

const server = express();

const whitelist = [
  "http://192.168.0.11:5173",
  "http://192.168.18.15:5173",
  "http://localhost:5173",
  "http://192.168.0.79:5173",
];
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Permitir origens na whitelist ou requisições sem origem (ex.: Postman, localhost direto)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: Origin ${origin} is not allowed.`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));
server.use(json());
server.use(routerGuardHandler);

server.get("/", (request: Request, response: Response) => {
  response.json("Hello, api with express").status(200);
});

server.use("/company", CompanyRouter);
server.use("/employee", EmployeeRouter);
server.use("/product", ProductRouter);
server.use("/report", ReportRouter);
server.use("/transaction", TransactionRouter);
server.use("/virtualStock", VirtualStockRouter);

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running on port: ${process.env.SERVER_PORT} \nAccess the server here: http://localhost:${process.env.SERVER_PORT}`
  );
});
