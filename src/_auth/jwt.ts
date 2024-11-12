import jwt from "jsonwebtoken"

const auth = {
    secret: process.env.SECRET_KEY ?? "StockWise",
    expires: "1h"
}

function signToken(payload: any) {
    return jwt.sign(payload, auth.secret, {
        expiresIn: auth.expires
    })
}

function verifyToken(token: string) {
    try {
        return jwt.verify(token, auth.secret) as jwt.JwtPayload
    } catch(error) {
        return false
    }
}


export { auth, signToken, verifyToken }