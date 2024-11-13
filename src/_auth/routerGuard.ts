import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt.ts";
import { CompanyService } from "../services/company.ts";

function routerGuardHandler(request: Request, response: Response, next: NextFunction) {
    const free_paths = [
        '/',
        '/company/validate',
        '/company',
    ]

    if(free_paths?.includes(request.path) ?? false) {
        if(request.path == "/company" && request.method == 'POST') {
            console.log("Parou aqui")
            return
        } else if(request.path == "/company" && request.method == 'POST') {
            return
        }

        next()
        return
    }

    const authorizationHeader = request.headers?.authorization ?? ""
    const token = authorizationHeader?.split(" ")[1] ?? false

    if(!token) {
        response.status(401).json({
            ERROR: "Unauthorized",
            description: "Missing authorization token!"
        })

        return
    }

    const decryptedToken = verifyToken(token)
    if(!decryptedToken) {
        response.status(401).json({
            ERROR: "Unauthorized",
            description: "Authorization token isn't valid!"
        })

        return
    }

    const foundCompany = CompanyService.getById(decryptedToken.id)
    if(!foundCompany) {
        response.status(401).json({
            ERROR: "Unauthorized",
            description: "Enterprise id on authorization token isn't valid!"
        })

        return
    }

    // passing valid jwt to next function (better then get and verify again in to all controllers)
    response.locals.companyId = decryptedToken.id

    next()
}

export { routerGuardHandler }